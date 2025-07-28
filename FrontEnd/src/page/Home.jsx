import React from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';

const Home = ({ expenses }) => {
  const countIncome = expenses.filter(e => e.type === 'income').length;
  const countExpense = expenses.filter(e => e.type === 'expense').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-sky-800 mb-10 text-center">
        Welcome to Your Financial Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Income Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-70 h-60 text-center transform hover:-translate-y-2 flex flex-col justify-center items-center gap-2 transition-all duration-300">
          <FaArrowCircleUp size={50} className="text-green-500  mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Income</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">{countIncome}</p>
        </div>

        {/* Outcome Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-70 h-60 text-center transform hover:-translate-y-2 flex flex-col justify-center items-center gap-2 transition-all duration-300">
          <FaArrowCircleDown size={50} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Outcome</h2>
          <p className="text-2xl font-bold text-red-600 mt-2">{countExpense}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
