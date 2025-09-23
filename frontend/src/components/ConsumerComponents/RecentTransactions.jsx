import React from "react";
import { ArrowUp, ArrowDown, PlusCircle, CreditCard } from "lucide-react";

const RecentTransactions = ({ transactions }) => {
  const getIconAndSign = (type) => {
    switch (type) {
      case "Top-Up":
        return { icon: <PlusCircle className="w-5 h-5 text-green-500" />, sign: "+" };
      case "Buy Tokens":
        return { icon: <ArrowDown className="w-5 h-5 text-red-500" />, sign: "-" };
      case "Sell Tokens":
        return { icon: <ArrowUp className="w-5 h-5 text-green-500" />, sign: "+" };
      case "Subscription Purchase":
        return { icon: <CreditCard className="w-5 h-5 text-red-500" />, sign: "-" };
      default:
        return { icon: <PlusCircle className="w-5 h-5 text-gray-500" />, sign: "" };
    }
  };

  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        transactions.map((tx, index) => {
          const { icon, sign } = getIconAndSign(tx.type);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              {/* Left: Icon & Type */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {icon}
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">{tx.type}</p>
                  <p className="text-sm text-gray-400">{tx.timestamp}</p>
                </div>
              </div>

              {/* Right: Amount with +/- */}
              <div className="flex flex-col items-end">
                <p
                  className={`font-medium ${
                    sign === "-" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {sign} {tx.amount} ₹
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentTransactions;
