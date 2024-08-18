import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors } from "react-hook-form";
import { createForm } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./Field.tsx";
import { TextField } from "./TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";

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
	const methods = useRHForm({
		defaultValues,
		// @ts-ignore
		resolver: yupResolver(schema),
		shouldUseNativeValidation: true,
	});
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = createForm(
		{ methods, onSubmit: handleSubmit },
		{
			Text: (props) => (
				<Field {...props}>{(props) => <TextField {...props} />}</Field>
			),
		},
		{
			Submit: (props) => <SubmitButton {...props} />,
		},
	);

	return {
		Form,
		// ArrayField: {
		// 	Text: () => {},
		// },
		// SubmitButton: () => <></>,
	};
};

export { useForm };
