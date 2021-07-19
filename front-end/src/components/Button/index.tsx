import React, { MouseEventHandler, ReactNode } from "react";
import cn from "classnames";

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  disabled?: boolean
  variant?: "primary" | "secondary";
}

const ButtonClsMap = {
  primary: "bg-blue text-white",
  secondary: "text-gray-pure-dark border-gray-pure-lighter border border-solid",
};

const Button: React.FC<ButtonProps> = ({
  variant,
  disabled,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        className,
        ButtonClsMap[variant || "primary"],
        `h-12 min-w-[150px] rounded`
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
