import { Battery } from "lucide-react"; // Replace with actual import

// You may need to pass `tokens` as a prop

const HeroSection = ({ tokens }) => (
    <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-3xl p-8 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl">
                        <Battery className="text-white h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Energy Supply Hub
                        </h2>
                        <p className="text-green-600 font-semibold text-lg">
                            Powering the Future, One Transaction at a Time
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 text-lg max-w-2xl">
                    Manage your renewable energy supply, track payments, and participate in the green energy ecosystem with our comprehensive supplier platform.
                </p>
            </div>
            <div className="mt-6 lg:mt-0">
                <div className="grid grid-cols-2 gap-4">
                    <br />
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{tokens?.available}</div>
                        <div className="text-sm text-gray-600">Available Tokens</div>
                    </div>
                    {/* <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">98.5%</div>
                        <div className="text-sm text-gray-600">Grid Reliability</div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
);

export default HeroSection;
