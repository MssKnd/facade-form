import type { PropsWithChildren } from "react";
import { useWatch, type Path } from "react-hook-form";
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
	const value = useWatch({ name });

	if (value !== allowValue) return null;

	return <>{children}</>;
};

export { FieldValueGuard };
