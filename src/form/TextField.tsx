import { forwardRef } from "react";
import { css } from "@emotion/react";

type Props = Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
	return <input type="text" ref={ref} {...props} css={style} />;
});

const style = css`
  &:invalid {
    border: 1px solid red;
		background-color: #ffcccc;
  }
`;

export { TextField };
