/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import React, { useState, useEffect } from 'react';

const PVBVExplainer = () => {
  const [pvValue, setPvValue] = useState(100);
  const [bonusLevel, setBonusLevel] = useState('');
  const [bonusPercentage, setBonusPercentage] = useState(3);
  const bvRatio = 3.43;
  
  const calculateBV = (pv) => {
    return (pv * bvRatio).toFixed(2);
  };
  
  const calculateBonus = (pv) => {
    let bonus = 0;
    let level = '';
    
    if (pv >= 7500) {
      bonus = 25;
      level = '25% of BV';
    } else if (pv >= 6000) {
      bonus = 23;
      level = '23% of BV';
    } else if (pv >= 4000) {
      bonus = 21;
      level = '21% of BV';
    } else if (pv >= 2500) {
      bonus = 18;
      level = '18% of BV';
    } else if (pv >= 1500) {
      bonus = 15;
      level = '15% of BV';
    } else if (pv >= 1000) {
      bonus = 12;
      level = '12% of BV';
    } else if (pv >= 600) {
      bonus = 9;
      level = '9% of BV';
    } else if (pv >= 300) {
      bonus = 6;
      level = '6% of BV';
    } else if (pv >= 100) {
      bonus = 3;
      level = '3% of BV';
    } else {
      bonus = 0;
      level = '0% of BV';
    }
    
    return { bonus, level };
  };
  
  const calculateBonusAmount = (bv, percentage) => {
    return (bv * (percentage / 100)).toFixed(2);
  };
  
  useEffect(() => {
    const { bonus, level } = calculateBonus(pvValue);
    setBonusPercentage(bonus);
    setBonusLevel(level);
  }, [pvValue]);
  
  const sampleProducts = [
    { name: "XS Energy Drink (12-pack)", pv: 13, bv: 44.59 },
    { name: "Nutrilite Daily Multivitamin", pv: 21, bv: 72.03 },
    { name: "Artistry Studio Skin Reset Serum", pv: 34, bv: 116.62 },
    { name: "eSpring Water Purifier", pv: 159, bv: 545.37 },
    { name: "Atmosphere Air Purifier", pv: 182, bv: 624.26 }
  ];
  
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Understanding Amway PV and BV</h1>
      
      <div className="flex flex-row gap-8 mb-8 h-64">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 flex-1 flex flex-col">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            <span className="text-2xl">PV</span> (Point Value)
          </h2>
          <p className="mb-2">Points assigned to products reflecting the <strong>marketing effort</strong> required to sell them.</p>
          <p className="mb-2">PV determines your <strong>Performance Bonus level</strong> in the compensation plan.</p>
          <p className="italic text-blue-600 mt-auto">Higher PV = Higher Performance Bonus %</p>
        </div>
        
        <div className="bg-green-50 p-5 rounded-lg border border-green-200 flex-1 flex flex-col">
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            <span className="text-2xl">BV</span> (Business Volume)
          </h2>
          <p className="mb-2">A monetary value related to a product's <strong>price</strong>.</p>
          <p className="mb-2">Performance Bonuses are calculated as a <strong>percentage of BV</strong>.</p>
          <p className="italic text-green-600 mt-auto">BV = Monetary base for bonus calculations</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">The Relationship</h2>
        <p className="mb-4">Current BV to PV ratio is <strong>3.43 to 1</strong></p>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-l-lg border border-blue-200 font-bold text-center w-32">
            1 PV
          </div>
          <div className="text-2xl px-4">=</div>
          <div className="bg-green-100 p-3 rounded-r-lg border border-green-200 font-bold text-center w-32">
            $3.43 BV
          </div>
        </div>
        <p className="text-sm text-center text-gray-600">Example: A product with 10 PV would have a BV of $34.30</p>
      </div>
      
      <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Interactive PV/BV Calculator</h2>
        
        <div className="mb-5">
          <label htmlFor="pv-slider" className="block mb-2 font-medium">
            Monthly PV: <span className="text-purple-800 font-bold">{pvValue}</span>
          </label>
          <input
            id="pv-slider"
            type="range"
            min="0"
            max="8000"
            step="100"
            value={pvValue}
            onChange={(e) => setPvValue(parseInt(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>2000</span>
            <span>4000</span>
            <span>6000</span>
            <span>8000</span>
          </div>
        </div>
        
        <div className="flex flex-row gap-4 mb-4">
          <div className="bg-white p-3 rounded border flex-1">
            <p className="text-sm font-medium text-gray-600">Monthly BV:</p>
            <p className="text-xl font-bold text-green-600">${calculateBV(pvValue)}</p>
          </div>
          
          <div className="bg-white p-3 rounded border flex-1">
            <p className="text-sm font-medium text-gray-600">Performance Bonus:</p>
            <p className="text-xl font-bold text-blue-600">{bonusPercentage}%</p>
            <p className="text-xs text-gray-500">{bonusLevel}</p>
          </div>
          
          <div className="bg-white p-3 rounded border flex-1">
            <p className="text-sm font-medium text-gray-600">Monthly Bonus Amount:</p>
            <p className="text-xl font-bold text-purple-600">
              ${calculateBonusAmount(calculateBV(pvValue), bonusPercentage)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-700 mb-4">Sample Products PV/BV Values</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Product</th>
                <th className="py-2 px-4 border-b text-center">PV</th>
                <th className="py-2 px-4 border-b text-center">BV ($)</th>
                <th className="py-2 px-4 border-b text-center">BV/PV Ratio</th>
              </tr>
            </thead>
            <tbody>
              {sampleProducts.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-yellow-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b text-center font-medium text-blue-600">{product.pv}</td>
                  <td className="py-2 px-4 border-b text-center font-medium text-green-600">${product.bv}</td>
                  <td className="py-2 px-4 border-b text-center">{(product.bv / product.pv).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Note: This interactive tool is for educational purposes. The actual BV to PV ratio and bonus structure are subject to Amway's current policies. Always refer to official Amway documentation for the most up-to-date information.</p>
      </div>
    </div>
  );
};

export default PVBVExplainer;