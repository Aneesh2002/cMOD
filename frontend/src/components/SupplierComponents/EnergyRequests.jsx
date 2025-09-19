import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
const EnergyRequestSection = ({ requests }) => (
    <div className="space-y-6">
         <h2 className="text-xl font-bold text-gray-800">Energy Requests</h2>
         {requests.map(req => (
             <div key={req.id} className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-gray-800">{req.from}</p>
                    <p className="text-sm text-gray-500">{req.amount} at {req.rate} - <span className="text-xs">{req.requestedAt}</span></p>
                </div>
                {req.status === 'Pending' ? (
                    <div className="flex space-x-2 self-end sm:self-center">
                        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"><CheckCircle className="h-4 w-4"/><span>Approve</span></button>
                        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"><XCircle className="h-4 w-4"/><span>Decline</span></button>
                    </div>
                ) : (
                    <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full self-end sm:self-center">{req.status}</span>
                )}
             </div>
         ))}
    </div>
);

export default EnergyRequestSection;
