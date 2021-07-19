import React, { ChangeEventHandler, CSSProperties, MouseEventHandler,  } from "react";

export interface InputProps {
  style?: CSSProperties;
  type?: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
}

// background: #FFFFFF;
// border: 2px solid #CCE7FF;
// border-radius: 4px;

const Input: React.FC<InputProps> = ({ type, className, value, disabled, readOnly, style, onClick, onChange }) => {
  return (
    <input
      onClick={onClick}
      style={style}
      type={type}
      value={value}
      className={`${className} min-w-[300px] h-12 px-4 border-2 box-border border-solid rounded border-gray-pure-lighter focus:border-blue-light`}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export { Input };
