import { useId } from "react";
import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors, Path } from "react-hook-form";
import { createForm, type BaseFieldProps } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./fields/Field.tsx";
import { TextField } from "./fields/TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { ControlledField } from "./fields/ControledField.tsx";
import { SelectField, type Option } from "./fields/SelectField.tsx";
import { FormBody } from "./layouts/FormBody.tsx";
import { ArrayField } from "./fields/ArrayField.tsx";

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
	const errors = methods.formState.errors;
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = createForm(
		{ id, methods, onSubmit: handleSubmit },
		{
			fields: {
				Text: ({ ...props }: Omit<BaseFieldProps<Values>, "errorMessage">) => (
					<Field {...props} errorMessage={getErrorMessage(props.name, errors)}>
						{(props) => <TextField {...props} />}
					</Field>
				),
				Select: ({
					options,
					...props
				}: BaseFieldProps<Values> & { options: Option[] }) => (
					<ControlledField {...props}>
						{({ value, ref: _, ...props }) => (
							<SelectField value={String(value)} {...props} options={options} />
						)}
					</ControlledField>
				),
			},
			arrayFields: {
				Text: ({ ...props }: Omit<BaseFieldProps<Values>, "errorMessage">) => (
					<ArrayField
						{...props}
						errorMessage={getErrorMessage(props.name, errors)}
					>
						{(props) => <TextField {...props} />}
					</ArrayField>
				),
			},
			buttons: {
				Submit: (props) => <SubmitButton id={id} {...props} />,
			},
			body: ({ children }) => <FormBody>{children}</FormBody>,
			footer: ({ children }) => <footer>{children}</footer>,
		},
	);

	return {
		formValues: {},
		Form,
	};
};

const getErrorMessage = <T extends Record<string, unknown>>(
	name: Path<T>,
	errors: FieldErrors<T>,
) => (errors[name]?.message ? String(errors[name]?.message) : undefined);

export { useForm };
