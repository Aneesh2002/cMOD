import { MoreVertical, ArrowUpRight, ArrowDownRight, Sparkles, LoaderCircle, AlertTriangle } from 'lucide-react';




const KPICard = ({ item }) => {
    const TrendIcon = item.trendDirection === 'up' ? ArrowUpRight : ArrowDownRight;
    const trendColor = item.trendDirection === 'up' ? 'text-green-600' : 'text-red-600';
    const iconColorMap = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        amber: 'bg-amber-100 text-amber-600',
        teal: 'bg-teal-100 text-teal-600',
    };
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
                <div className={`p-2 rounded-lg ${iconColorMap[item.color]}`}>
                    <item.icon className="h-6 w-6" />
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical className="h-5 w-5" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-1">{item.title}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
                <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span>{item.trend}</span>
                </div>
            </div>
        </div>
    );
};

const Overview = ({ data = {}, onGenerateInsights, insights, isLoading, error }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data.kpis ?? []).map(item => <KPICard key={item.title} item={item} />)}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Energy Supplied (Last 6 Months)</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                    {(data.energyChart ?? []).map(bar => (
                        <div key={bar.name} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-green-200 rounded-t-md hover:bg-green-400 transition-colors" style={{ height: `${(bar.value / Math.max(...(data.energyChart ?? []).map(d => d.value))) * 100}%` }}></div>
                            <span className="text-xs text-gray-500 mt-2">{bar.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Transaction ID</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.transactions ?? []).map(tx => {
                            const statusColor = tx.status === 'Completed' ? 'bg-green-100 text-green-800' : tx.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800';
                            return (
                                <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{tx.id}</td>
                                    <td className="px-6 py-4 flex items-center space-x-2"><tx.icon className="h-5 w-5 text-gray-400" /><span>{tx.type}</span></td>
                                    <td className="px-6 py-4">{tx.amount}</td>
                                    <td className="px-6 py-4">{tx.date}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{tx.status}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default Overview;
