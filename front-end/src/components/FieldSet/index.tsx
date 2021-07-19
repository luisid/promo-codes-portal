import React from "react";
import cn from "classnames";

export interface FieldSetProps {
  className?: string;
  variant?: "horizantal" | "vertical";
}

const variantClassMap = {
  horizantal: "flex-row",
  vertical: "flex-col",
};

const FieldSet: React.FC<FieldSetProps> = ({
  variant,
  className,
  children,
}) => {
  return (
    <fieldset
      className={cn(
        className,
        "flex items-end",
        variantClassMap[variant || "horizantal"]
      )}
    >
      {children}
    </fieldset>
  );
};

export { FieldSet };
