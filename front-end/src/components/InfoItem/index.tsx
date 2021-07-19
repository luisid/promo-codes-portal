import React from "react";

export interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col mr-6">
      <p className="text-sm text-gray-pure">{label}</p>
      <h4 className="text-xl text-gray-pure-dark">{value}</h4>
    </div>
  );
};

export { InfoItem };
