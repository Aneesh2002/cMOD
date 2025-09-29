import React from 'react';

export default function Toast({ message, type }) {
    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`fixed bottom-6 right-6 px-4 py-2 rounded-lg text-white shadow-lg ${bgColor}`}>
            {message}
        </div>
    );
}
