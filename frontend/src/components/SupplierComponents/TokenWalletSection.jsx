import React from "react";
import { Share2 } from "lucide-react";

const TokenWalletSection = ({ wallet }) => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Token Wallet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500">Total Tokens Earned</p>
                <p className="text-2xl font-bold text-green-600">{wallet.summary.totalEarned}</p>
            </div>
             <div className="bg-white p-5 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500">Pending Payout</p>
                <p className="text-2xl font-bold text-amber-600">{wallet.summary.pendingPayout}</p>
            </div>
             <div className="bg-white p-5 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500">Next Payout Date</p>
                <p className="text-2xl font-bold text-gray-800">{wallet.summary.nextPayoutDate}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payout History</h3>
             <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">TxHash</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {wallet.payoutHistory.map(p => (
                    <tr key={p.txHash} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-xs text-blue-600 hover:underline cursor-pointer flex items-center space-x-1">
                           <span>{p.txHash}</span>
                           <Share2 className="h-3 w-3"/>
                        </td>
                        <td className="px-6 py-4">{p.date}</td>
                        <td className="px-6 py-4 font-semibold">{p.amount}</td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{p.status}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
             </table>
        </div>
    </div>
);
export default TokenWalletSection;