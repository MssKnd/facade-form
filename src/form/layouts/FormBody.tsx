import { css } from "@emotion/react";
import type { FC, PropsWithChildren } from "react";

const FormBody: FC<PropsWithChildren> = ({ children }) => (
	<div css={style}>{children}</div>
);

const style = css`
	display: grid;
	gap: 16px;
`;

export { FormBody };
