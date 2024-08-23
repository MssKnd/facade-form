import { useId } from "react";
import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors, Path } from "react-hook-form";
import { createForm, type BaseFieldProps } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./field/Field.tsx";
import { TextField } from "./field/TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { ControlledField } from "./field/ControledField.tsx";
import { SelectField, type Option } from "./field/SelectField.tsx";

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
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldUseNativeValidation: true,
	});
	const formValues = methods.watch();
	const errors = methods.formState.errors;
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = createForm(
		{ id, methods, onSubmit: handleSubmit },
		{
			Text: ({ ...props }: Omit<BaseFieldProps<Values>, "errorMessage">) => (
				<Field<Values>
					{...props}
					errorMessage={getErrorMessage(props.name, errors)}
				>
					{(props) => <TextField {...props} />}
				</Field>
			),
			Select: ({
				options,
				...props
			}: BaseFieldProps<Values> & { options: Option[] }) => (
				<ControlledField<Values> {...props}>
					{({ value, ref: _, ...props }) => (
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

const getErrorMessage = <T extends Record<string, unknown>>(
	name: Path<T>,
	errors: FieldErrors<T>,
) => (errors[name]?.message ? String(errors[name]?.message) : undefined);

export { useForm };
