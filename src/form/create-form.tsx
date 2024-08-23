import { css } from "@emotion/react";
import { FormProvider, type UseFormReturn, type Path } from "react-hook-form";
import type { FC, PropsWithChildren } from "react";
import type { Option } from "./SelectField";

type Props<FieldValues extends Record<string, unknown>> = {
	id: string;
	methods: UseFormReturn<FieldValues, any, undefined>;
	onSubmit: () => void;
};

type BaseFieldProps<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
};

interface Form<FormValues extends Record<string, unknown>>
	extends FC<PropsWithChildren> {
	Field: {
		Text: FC<BaseFieldProps<FormValues>>;
		Select: FC<BaseFieldProps<FormValues> & { options: Option[] }>;
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
			<form id={id} onSubmit={onSubmit} css={style}>
				{children}
			</form>
		</FormProvider>
	);

	Form.Field = fields;
	Form.Button = buttons;

	return Form as Form<FieldValues>;
};

const style = css`
	display: grid;
	gap: 16px;
`;

export { createForm, type BaseFieldProps };
