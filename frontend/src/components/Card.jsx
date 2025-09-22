import React from "react";

export const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};
