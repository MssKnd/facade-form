import type { FC } from "react";
import { css } from "@emotion/react";

type Props = {
	fieldId: string;
	label: string;
};

const FieldLabel: FC<Props> = ({ fieldId, label }) => (
	<label htmlFor={fieldId} css={styles.label}>
		{label}
	</label>
);

const styles = {
	label: css`
	  display: inline-flex; /* for ::after */
		font-size: 0.8rem;
		font-weight: bold;
		align-items: center;
    color: #333;
		gap: 4px;
	`,
};

export { FieldLabel };
