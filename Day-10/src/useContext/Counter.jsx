import React, { useState } from 'react';
import { useCounter } from './CounterContext';
import Test from './Test';

function Counter() {

    const { counter, setCounter } = useCounter();

    const handleIncrease = () => {
        setCounter(prev => prev + 1);

    }
    const handleDecrease = () => {
        setCounter(prev => prev - 1);

    }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Counter</h1>
                <div className="text-6xl font-semibold text-blue-600 mb-6">{counter}</div>
                <div className="flex gap-4">
                    <button
                        onClick={handleIncrease}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition"
                    >
                        Increase
                    </button>
                    <button
                        onClick={handleDecrease}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition"
                    >
                        Decrease
                    </button>
                </div>
            </div>
            <Test  />
        </div>
    );
}

export default Counter;