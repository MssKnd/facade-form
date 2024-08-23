import { type FormEvent } from "react";
import {
	useFormContext,
	Controller,
	type ControllerRenderProps,
	type Path,
} from "react-hook-form";
import type { BaseFieldProps } from "../create-form.tsx";
import { BaseField } from "./BaseField.tsx";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
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
				<Controller
					control={control}
					name={name}
					render={({ field }) =>
						children({ ...props, ...fieldProps, ...field })
					}
				/>
			)}
		</BaseField>
	);
};

export { ControlledField };
