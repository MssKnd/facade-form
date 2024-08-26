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
import type { FormValues } from "../types.ts";

type ChildrenProps<Values extends FormValues> = {
	id: string;
	isvalid: boolean;
	onInvalid: (event: FormEvent) => void;
} & ControllerRenderProps<Values, Path<Values>>;

type Props<Values extends FormValues> = BaseFieldProps<Values> & {
	children: (props: ChildrenProps<Values>) => JSX.Element;
};

const ControlledField = <FormValue extends FormValues>({
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
