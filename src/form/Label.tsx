import type { FC } from "react";
import { css } from "@emotion/react";

type Props = {
	fieldId: string;
	label: string;
};

const Label: FC<Props> = ({ fieldId, label }) => (
	<label htmlFor={fieldId} css={styles.label}>
		{label}
	</label>
);

const styles = {
	label: css`
		font-size: 0.8rem;
		font-weight: bold;
    color: #333;
	`,
};

export { Label };
