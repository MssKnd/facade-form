import { type FormEvent } from "react";
import {
	useFormContext,
	Controller,
	type ControllerRenderProps,
	type Path,
	type Control,
} from "react-hook-form";
import type { BaseFieldProps } from "../create-form.tsx";
import { BaseField } from "./BaseField.tsx";
import { css } from "@emotion/react";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
	isvalid: boolean;
	onInvalid: (event: FormEvent) => void;
} & ControllerRenderProps<FormValues, Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> =
	BaseFieldProps<FormValues> & {
		children: (props: ChildrenProps<FormValues>) => JSX.Element;
	};

const ControlledField = <FormValue extends Record<string, unknown>>({
	label,
	name,
	errorMessage,
	children,
	...fieldProps
}: Props<FormValue>) => {
	const { control } = useFormContext<FormValue>();

	return (
		<BaseField label={label} errorMessage={errorMessage}>
			{(props) => (
				<div css={style}>
					<Controller
						control={control}
						name={name}
						render={({ field }) =>
							children({
								...props,
								...fieldProps,
								...field,
								isvalid: errorMessage == null,
							})
						}
					/>
				</div>
			)}
		</BaseField>
	);
};

const style = css`
		display: flex;
	`;

export { ControlledField };
