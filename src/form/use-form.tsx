import { useForm as useRHForm } from "react-hook-form";
import type { DefaultValues, FieldErrors, Path } from "react-hook-form";
import { createForm } from "./create-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";
import { Field } from "./Field.tsx";
import { TextField } from "./TextField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { ControlledField } from "./ControledField.tsx";
import { SelectField } from "./SelectField.tsx";
import type { Option } from "./SelectField.tsx";

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
	// const formValues = methods.watch();
	const handleSubmit = methods.handleSubmit(onSubmit, onInvalidError);

	const Form = createForm(
		{ methods, onSubmit: handleSubmit },
		{
			Text: ({ label, name }: { label: string; name: Path<Values> }) => (
				<Field label={label} name={name}>
					{(props) => <TextField {...props} />}
				</Field>
			),
			Select: ({
				label,
				name,
				options,
			}: { label: string; name: Path<Values>; options: Option[] }) => (
				<ControlledField label={label} name={name}>
					{(props) => <SelectField {...props} options={options} />}
				</ControlledField>
			),
		},
		{
			Submit: (props) => <SubmitButton {...props} />,
		},
	);

	return {
		// formValues,
		Form,
		// ArrayField: {
		// 	Text: () => {},
		// },
		// SubmitButton: () => <></>,
	};
};

export { useForm };
