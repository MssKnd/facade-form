import {
	useFieldArray,
	useFormContext,
	type ArrayPath,
	type FieldArray,
	type FieldValues,
	type Path,
	type UseFormRegisterReturn,
} from "react-hook-form";
import type { BaseFieldProps } from "../create-form";
import { BaseField, type BaseChildrenProps } from "./BaseField";
import { css } from "@emotion/react";
import type { FormValues } from "../types";

type ChildrenProps<Values extends FormValues> = BaseChildrenProps &
	UseFormRegisterReturn<Path<Values>>;

type ArrayFieldDefaultValue<Values extends FormValues> = {
	defaultValue: FieldArray<FieldValues, ArrayPath<Values>>;
};

type Props<Values extends FormValues> = BaseFieldProps<Values> &
	ArrayFieldDefaultValue<Values> & {
		children: (props: ChildrenProps<Values>) => JSX.Element;
	};

const ArrayField = <Values extends FormValues>({
	label,
	name,
	errorMessage,
	defaultValue,
	children,
	...fieldProps
}: Props<Values>) => {
	const { register } = useFormContext<Values>();
	const { fields, append, remove } = useFieldArray({
		name: name as ArrayPath<Values>,
	});

	return (
		<BaseField label={label} errorMessage={errorMessage}>
			{({ id, ...props }) => (
				<div css={styles.fields}>
					{fields.map((field, index) => (
						<div key={field.id} css={styles.field}>
							{children({
								id: id + field.id,
								...register(`${name}.${index}` as Path<Values>),
								...props,
								...fieldProps,
							})}
							<button
								type="button"
								css={styles.button}
								onClick={() => {
									remove(index);
								}}
							>
								-
							</button>
						</div>
					))}
					<div>
						<button
							type="button"
							css={styles.button}
							onClick={() => {
								append(defaultValue);
							}}
						>
							+
						</button>
					</div>
				</div>
			)}
		</BaseField>
	);
};

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
	button: css`
		width: 34px;
    height: 34px;
	`,
};

export { ArrayField, type ArrayFieldDefaultValue };
