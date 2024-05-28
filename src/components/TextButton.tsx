import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = ({ className, ...props }: Props) => (
  <button
    className={`underline hover:underline-offset-4 ${className}`}
    {...props}
  />
);

export default TextButton;
