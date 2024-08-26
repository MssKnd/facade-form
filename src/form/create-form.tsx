import { css } from "@emotion/react";
import { FormProvider, type UseFormReturn, type Path } from "react-hook-form";
import type { FC, PropsWithChildren } from "react";
import type { Option } from "./fields/SelectField";

type Props<FieldValues extends Record<string, unknown>> = {
	id: string;
	methods: UseFormReturn<FieldValues, any, undefined>;
	onSubmit: () => void;
};

type BaseFieldProps<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	required?: boolean;
	disabled?: boolean;
	errorMessage?: string;
};

interface Form<FormValues extends Record<string, unknown>>
	extends FC<PropsWithChildren> {
	Field: {
		Text: FC<BaseFieldProps<FormValues>>;
		Select: FC<BaseFieldProps<FormValues> & { options: Option[] }>;
	};
	ArrayField: {
		Text: FC<BaseFieldProps<FormValues> & { name: Path<FormValues> }>;
	};
	Button: {
		Submit: FC<{ label: string }>;
	};
	Guard: FC<
		PropsWithChildren<{
			name: Path<FormValues>;
			value: FormValues[Path<FormValues>];
		}>
	>;
	Header: FC<PropsWithChildren>;
	Body: FC<PropsWithChildren>;
	Footer: FC<PropsWithChildren>;
}

const createForm = <FieldValues extends Record<string, any>>(
	{ id, methods, onSubmit }: Props<FieldValues>,
	compornents: {
		fields: Form<FieldValues>["Field"];
		arrayFields: Form<FieldValues>["ArrayField"];
		buttons: Form<FieldValues>["Button"];
		guard: Form<FieldValues>["Guard"];
		body: Form<FieldValues>["Body"];
		footer: Form<FieldValues>["Footer"];
	},
): Form<FieldValues> => {
	const Form = ({ children }: PropsWithChildren) => (
		<FormProvider {...methods}>
			<form id={id} onSubmit={onSubmit} css={style} noValidate>
				{children}
			</form>
		</FormProvider>
	);

	Form.Field = compornents.fields;
	Form.ArrayField = compornents.arrayFields;
	Form.Button = compornents.buttons;
	Form.Guard = compornents.guard;
	Form.Body = compornents.body;
	Form.Footer = compornents.footer;

	return Form as Form<FieldValues>;
};

const style = css`
	display: grid;
	gap: 24px;
`;

export { createForm, type BaseFieldProps };
