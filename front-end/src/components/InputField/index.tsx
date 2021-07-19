import React, { CSSProperties } from "react";
import cn from "classnames";
import { Input, InputProps } from "../Input";

export interface InputFieldProps extends InputProps {
  label: string;
  inputStyle?: CSSProperties
  className?: string;
  inputCls?: string;
  labelCls?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  className,
  inputStyle,
  inputCls,
  labelCls,
  ...inputProps
}) => {
  return (
    <div className={cn(className, "flex flex-col")}>
      <label className={cn(labelCls, "text-xs text-gray-pure")}>{label}</label>
      <Input className={cn(inputCls, "mt-2")} {...inputProps} style={inputStyle} />
    </div>
  );
};

export { InputField };
