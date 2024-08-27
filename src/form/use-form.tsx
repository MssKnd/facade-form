import { useCallback, useId } from "react";
import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors, Path } from "react-hook-form";
import { createForm } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./fields/Field.tsx";
import { TextField } from "./fields/TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { ControlledField } from "./fields/ControledField.tsx";
import { SelectField } from "./fields/SelectField.tsx";
import { FormBody } from "./layouts/FormBody.tsx";
import { ArrayField } from "./fields/ArrayField.tsx";
import { FieldValueGuard } from "./FieldValueGuard.tsx";
import { RadioGroupField } from "./fields/RadioGroupField.tsx";
import type { FormValues } from "./types.ts";

type Props<Values extends FormValues> = {
	schema: ObjectSchema<Values>;
	defaultValues: DefaultValues<Values>;
	onSubmit: (values: Values) => void;
	onInvalidError: (errors: FieldErrors<Values>) => void;
	isMutating: boolean;
};

const useForm = <Values extends FormValues>({
	schema,
	defaultValues,
	onSubmit,
	onInvalidError,
}: Props<Values>) => {
	const id = useId();
	const { ...methods } = useRHForm({
		defaultValues,
		// @ts-ignore
		resolver: yupResolver(schema),
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldUseNativeValidation: true,
	});
	const errors = methods.formState.errors;
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = useCallback(
		createForm(
			{ id, methods, onSubmit: handleSubmit },
			{
				fields: {
					Text: ({ ...props }) => (
						<Field
							{...props}
							errorMessage={getErrorMessage(props.name, errors)}
						>
							{(props) => <TextField {...props} />}
						</Field>
					),
					Radio: ({ options, ...props }) => (
						<Field
							{...props}
							errorMessage={getErrorMessage(props.name, errors)}
						>
							{(props) => (
								<RadioGroupField
									{...props}
									options={options}
									defaultValue={defaultValues[props.name] as string}
								/>
							)}
						</Field>
					),
					Select: ({ options, ...props }) => (
						<ControlledField {...props}>
							{({ value, ref: _, ...props }) => (
								<SelectField
									value={String(value)}
									{...props}
									options={options}
								/>
							)}
						</ControlledField>
					),
				},
				arrayFields: {
					Text: ({ ...props }) => (
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
				guard: ({ allowValue, name, children }) => (
					<FieldValueGuard allowValue={allowValue} name={name}>
						{children}
					</FieldValueGuard>
				),
				body: ({ children }) => <FormBody>{children}</FormBody>,
				footer: ({ children }) => <footer>{children}</footer>,
			},
		),
		[],
	);

	return {
		Form,
	};
};

const getErrorMessage = <T extends Record<string, unknown>>(
	name: Path<T>,
	errors: FieldErrors<T>,
) => (errors[name]?.message ? String(errors[name]?.message) : undefined);

export { useForm };
