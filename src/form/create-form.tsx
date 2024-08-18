import type { FC, PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";
import type { UseFormReturn, Path } from "react-hook-form";
import type { Option } from "./SelectField";

type Props<FieldValues extends Record<string, unknown>> = {
	id: string;
	methods: UseFormReturn<FieldValues, any, undefined>;
	onSubmit: () => void;
};

interface Form<FormValues extends Record<string, unknown>>
	extends FC<PropsWithChildren> {
	Field: {
		Text: FC<{ label: string; name: Path<FormValues> }>;
		Select: FC<{ label: string; name: Path<FormValues>; options: Option[] }>;
	};
	Button: {
		Submit: FC<{ label: string }>;
	};
}

const createForm = <FieldValues extends Record<string, any>>(
	{ id, methods, onSubmit }: Props<FieldValues>,
	fields: Form<FieldValues>["Field"],
	buttons: Form<FieldValues>["Button"],
): Form<FieldValues> => {
	const Form = ({ children }: PropsWithChildren) => (
		<FormProvider {...methods}>
			<form id={id} onSubmit={onSubmit} noValidate>
				{children}
			</form>
		</FormProvider>
	);

	Form.Field = fields;
	Form.Button = buttons;

	return Form as Form<FieldValues>;
};

export { createForm };
