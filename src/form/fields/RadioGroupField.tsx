import { forwardRef } from "react";
import { css } from "@emotion/react";

type Option = { value: string; label: string };

type RadioGroupOptions = {
	options: Option[];
};

type Props = {
	isvalid?: boolean;
} & RadioGroupOptions &
	Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const RadioGroupField = forwardRef<HTMLInputElement, Props>(
	({ isvalid, id, defaultValue, options, ...props }, ref) => {
		return (
			<ul css={styles.list}>
				{options.map((option) => (
					<li key={option.value} css={styles.item}>
						<label>
							<input
								id={
									defaultValue === option.value ? id : `${id}_${option.value}`
								}
								type="radio"
								ref={ref}
								defaultChecked={defaultValue === option.value}
								value={option.value}
								{...props}
								aria-invalid={isvalid ? undefined : true}
								aria-errormessage={isvalid ? undefined : `${id}_error`}
								required // Radio buttons are required by default
							/>
							{option.label}
						</label>
					</li>
				))}
			</ul>
		);
	},
);

const styles = {
	list: css`
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	gap: 8px;
	padding: 4px 0;
	margin: 0;
`,
	item: css`
	list-style: none;
`,
};

export { RadioGroupField, type RadioGroupOptions };
