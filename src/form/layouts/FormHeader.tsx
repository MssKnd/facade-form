import { css } from "@emotion/react";
import type { FormValues } from "../types";
import type { FieldErrors } from "react-hook-form";

type Props<Values extends FormValues> = {
	errors: FieldErrors<Values>;
};

const FormHeader = <Values extends FormValues>({
	errors: errorObject,
}: Props<Values>) => {
	const errors = Object.values(errorObject);

	if (errors.length === 0) return null;

	return (
		<div>
			<ul css={styles.list}>
				{errors.map((error) => (
					<li
						key={String(error?.message)}
						onClick={() => {
							document.getElementsByName(error?.ref?.name)[0]?.focus()
						}}
						css={styles.item}
					>
						{String(error?.message)}
					</li>
				))}
			</ul>
		</div>
	);
};

const styles = {
	list: css`
		margin: 0;
		padding: 8px 4px;
		background-color: #f8d7da;
		border: 1px solid red;
		border-radius: 4px;
		color: red;
	`,
	item: css`
		margin-left: 24px;
		cursor: pointer;
	`,
};

export { FormHeader };
