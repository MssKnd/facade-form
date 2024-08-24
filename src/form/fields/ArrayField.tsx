import { Fragment, memo, type FormEvent } from "react";
import {
	useFieldArray,
	useFormContext,
	type Path,
	type UseFormRegisterReturn,
} from "react-hook-form";
import type { BaseFieldProps } from "../create-form";
import { BaseField } from "./BaseField";
import { css } from "@emotion/react";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
	isvalid: boolean;
	onInvalid: (event: FormEvent) => void;
} & UseFormRegisterReturn<Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> =
	BaseFieldProps<FormValues> & {
		children: (props: ChildrenProps<FormValues>) => JSX.Element;
	};

const ArrayField = memo(
	<FormValue extends Record<string, unknown>>({
		label,
		name,
		errorMessage,
		children,
		...fieldProps
	}: Props<FormValue>) => {
		const { register } = useFormContext<FormValue>();
		const { fields } = useFieldArray({ name });

		return (
			<BaseField label={label} errorMessage={errorMessage}>
				{({ id, ...props }) => (
					<div css={styles.fields}>
						{fields.map((field, index) => (
							<div key={field.id} css={styles.field}>
								{children({
									id: id + field.id,
									...register(`${name}.${index}` as Path<FormValue>),
									...props,
									...fieldProps,
									isvalid: errorMessage == null,
								})}
								<button type="button">x</button>
							</div>
						))}
					</div>
				)}
			</BaseField>
		);
	},
);

const styles = {
	fields: css`
		display: flex;
    flex-direction: column;
    gap: 8px;
	`,
	field: css`
		display: flex;
    gap: 4px;
  `,
};

export { ArrayField };
