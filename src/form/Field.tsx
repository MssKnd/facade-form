import { useFormContext } from "react-hook-form";
import type { Path, UseFormRegisterReturn } from "react-hook-form";
import { FormEvent, useId } from "react";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
	onInvalid: (event: FormEvent) => void;
} & UseFormRegisterReturn<Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	children: (props: ChildrenProps<FormValues>) => JSX.Element;
};

const Field = <FormValue extends Record<string, unknown>>({
	label,
	name,
	children,
}: Props<FormValue>) => {
	const id = useId();
	const { register } = useFormContext<FormValue>();

	// prevent the default behavior of the form when the field is invalid
	const handleInvalid = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<div>{children({ id, onInvalid: handleInvalid, ...register(name) })}</div>
		</div>
	);
};

export { Field };
