import { type FormEvent } from "react";
import {
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

const Field = <FormValue extends Record<string, unknown>>({
	label,
	name,
	errorMessage,
	children,
	...fieldProps
}: Props<FormValue>) => {
	const { register } = useFormContext<FormValue>();

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
