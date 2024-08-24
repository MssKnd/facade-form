import type { PropsWithChildren } from "react";
import { useFormContext, type Path } from "react-hook-form";

type Props<FormValues extends Record<string, unknown>> = PropsWithChildren<{
	name: Path<FormValues>;
	value: FormValues[Path<FormValues>];
}>;

const FieldValueGuard = <FormValues extends Record<string, unknown>>({
	name,
	value,
	children,
}: Props<FormValues>) => {
	const { watch } = useFormContext<FormValues>();

	if (watch(name) !== value) return null;

	return <>{children}</>;
};

export { FieldValueGuard };
