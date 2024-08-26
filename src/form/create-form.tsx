import { css } from "@emotion/react";
import { FormProvider, type UseFormReturn, type Path } from "react-hook-form";
import type { FC, PropsWithChildren } from "react";
import type { SelectOptions } from "./fields/SelectField";
import type { FormValues } from "./types";
import type { ArrayFieldDefaultValue } from "./fields/ArrayField";

type Props<Values extends FormValues> = {
	id: string;
	methods: UseFormReturn<Values, any, undefined>;
	onSubmit: () => void;
};

type FieldProps<Values extends FormValues> = {
	label: string;
	name: Path<Values>;
	required?: boolean;
	disabled?: boolean;
};

type FieldErrorMessage = { errorMessage?: string };

type BaseFieldProps<Values extends FormValues> = FieldProps<Values> &
	FieldErrorMessage;

interface Form<Values extends FormValues> extends FC<PropsWithChildren> {
	Field: {
		Text: FC<BaseFieldProps<Values>>;
		Select: FC<BaseFieldProps<Values> & SelectOptions>;
	};
	ArrayField: {
		Text: FC<BaseFieldProps<Values> & ArrayFieldDefaultValue<Values>>;
	};
	Button: {
		Submit: FC<{ label: string }>;
	};
	Guard: FC<
		PropsWithChildren<{
			name: Path<Values>;
			value: Values[Path<Values>];
		}>
	>;
	Header: FC<PropsWithChildren>;
	Body: FC<PropsWithChildren>;
	Footer: FC<PropsWithChildren>;
}

const createForm = <Values extends Record<string, any>>(
	{ id, methods, onSubmit }: Props<Values>,
	compornents: {
		fields: Form<Values>["Field"];
		arrayFields: Form<Values>["ArrayField"];
		buttons: Form<Values>["Button"];
		guard: Form<Values>["Guard"];
		body: Form<Values>["Body"];
		footer: Form<Values>["Footer"];
	},
): Form<Values> => {
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

	return Form as Form<Values>;
};

const style = css`
	display: grid;
	gap: 24px;
`;

export { createForm, type BaseFieldProps, type FieldProps };
