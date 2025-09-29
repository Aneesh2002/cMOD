import React from "react";

// Props:
// icon: React component (from lucide-react)
// title: string
// value: number or string
// unit: optional string
// color: TailwindCSS color classes (e.g., "text-blue-500")
const KPICard = ({ icon: Icon, title, value, unit, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`${color} h-5 w-5`} />
            <span className="text-gray-600 text-sm font-medium">{title}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === "number" ? value.toLocaleString() : value}
            {unit && (
              <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
