import { useId } from "react";
import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors, Path } from "react-hook-form";
import { createForm, type BaseFieldProps } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./Field.tsx";
import { TextField } from "./TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { ControlledField } from "./ControledField.tsx";
import { SelectField, type Option } from "./SelectField.tsx";

type Props<Values extends Record<string, unknown>> = {
	schema: ObjectSchema<Values>;
	defaultValues: DefaultValues<Values>;
	onSubmit: (values: Values) => void;
	onInvalidError: (errors: FieldErrors<Values>) => void;
	isMutating: boolean;
};

const useForm = <Values extends Record<string, unknown>>({
	schema,
	defaultValues,
	onSubmit,
	onInvalidError,
}: Props<Values>) => {
	const id = useId();
	const methods = useRHForm({
		defaultValues,
		// @ts-ignore
		resolver: yupResolver(schema),
		shouldUseNativeValidation: true,
	});
	const formValues = methods.watch();
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = createForm(
		{ id, methods, onSubmit: handleSubmit },
		{
			Text: ({ ...props }: BaseFieldProps<Values>) => (
				<Field<Values> {...props}>{(props) => <TextField {...props} />}</Field>
			),
			Select: ({
				options,
				...props
			}: BaseFieldProps<Values> & { options: Option[] }) => (
				<ControlledField<Values> {...props}>
					{({ value, ...props }) => (
						<SelectField value={String(value)} {...props} options={options} />
					)}
				</ControlledField>
			),
		},
		{
			Submit: (props) => <SubmitButton id={id} {...props} />,
		},
	);

	return {
		formValues,
		Form,
		// ArrayField: {
		// 	Text: () => {},
		// },
	};
};

export { useForm };
