import { Fragment, memo, type FormEvent } from "react";
import {
	useFieldArray,
	useFormContext,
	type ArrayPath,
	type Path,
	type UseFormRegisterReturn,
} from "react-hook-form";
import type { BaseFieldProps } from "../create-form";
import { BaseField } from "./BaseField";
import { css } from "@emotion/react";
import type { FormValues } from "../types";

type ChildrenProps<Values extends FormValues> = {
	id: string;
	isvalid: boolean;
	onInvalid: (event: FormEvent) => void;
} & UseFormRegisterReturn<Path<Values>>;

type Props<Values extends FormValues> = BaseFieldProps<Values> & {
	children: (props: ChildrenProps<Values>) => JSX.Element;
};

const ArrayField = <Values extends FormValues>({
	label,
	name,
	errorMessage,
	children,
	...fieldProps
}: Props<Values>) => {
	const { register } = useFormContext<Values>();
	const { fields } = useFieldArray({
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
								isvalid: errorMessage == null,
							})}
							<button type="button">x</button>
						</div>
					))}
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
};

export { ArrayField };
