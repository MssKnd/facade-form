import type { PropsWithChildren } from "react";
import { type Path, type UseFormWatch } from "react-hook-form";
import type { FormValues } from "./types";

type Props<Values extends FormValues> = PropsWithChildren<{
	name: Path<Values>;
	allowValue: Values[Path<Values>];
	watch: UseFormWatch<Values>;
}>;

const FieldValueGuard = <Values extends FormValues>({
	name,
	allowValue,
	watch,
	children,
}: Props<Values>) => {
	if (watch(name) !== allowValue) return null;

	return <>{children}</>;
};

export { FieldValueGuard };
