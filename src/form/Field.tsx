import { useFormContext } from "react-hook-form";
import type { Path, UseFormRegisterReturn } from "react-hook-form";
import type { ReactNode } from "react";
import { useId } from "react";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
} & UseFormRegisterReturn<Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	children: (props: ChildrenProps<FormValues>) => ReactNode;
};

const Field = <FormValue extends Record<string, unknown>>({
	label,
	name,
	children,
}: Props<FormValue>) => {
	const id = useId();
	const { register } = useFormContext<FormValue>();

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<div>{children({ id, ...register(name) })}</div>
		</div>
	);
};

export { Field };
