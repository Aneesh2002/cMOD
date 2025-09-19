import React from 'react';
const ServicesSection = ({ services }) => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(service => (
                <div key={service.name} className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{service.name}</h3>
                        {service.active ? 
                            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Active</span> :
                            <button className="text-xs font-semibold text-white bg-green-600 rounded-full px-3 py-1 hover:bg-green-700">Activate</button>
                        }
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
            ))}
        </div>
    </div>
);

export default ServicesSection;
