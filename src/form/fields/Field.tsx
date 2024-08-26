import { type FormEvent } from "react";
import {
	useFormContext,
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

const Field = <Values extends FormValues>({
	label,
	name,
	errorMessage,
	children,
	...fieldProps
}: Props<Values>) => {
	const { register } = useFormContext<Values>();

	return (
		<BaseField label={label} errorMessage={errorMessage}>
			{(props) => (
				<div css={style}>
					{children({
						...register(name),
						...props,
						...fieldProps,
						isvalid: errorMessage == null,
					})}
				</div>
			)}
		</BaseField>
	);
};

const style = css`
		display: flex;
	`;

export { Field };
