import React from "react";

export interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="flex-grow flex flex-col px-8 py-10">{children}</div>;
};

export { Body };
