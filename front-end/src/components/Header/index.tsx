import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row flex-none h-20 bg-white px-8 py-4">
      {children}
    </div>
  );
};

export { Header };
