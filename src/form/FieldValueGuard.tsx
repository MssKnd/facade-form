import type { PropsWithChildren } from "react";
import { useFormContext, type Path } from "react-hook-form";
import type { FormValues } from "./types";

type Props<Values extends FormValues> = PropsWithChildren<{
	name: Path<Values>;
	allowValue: Values[Path<Values>];
}>;

const FieldValueGuard = <Values extends FormValues>({
	name,
	allowValue,
	children,
}: Props<Values>) => {
	const { watch } = useFormContext<Values>();

	if (watch(name) !== allowValue) return null;

	return <>{children}</>;
};

export { FieldValueGuard };
