'use client';
import { useState } from 'react';
import { useAssets } from '@/context/AssetContext';

export default function PortfolioPage() {
  const { balances, deposit, withdraw } = useAssets();
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => {
    if (amount > 0) deposit(asset, amount);
  };

  const handleWithdraw = () => {
    if (amount > 0) withdraw(asset, amount);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Portfolio</h1>
      <ul>
        {Object.entries(balances).map(([key, value]) => (
          <li key={key} className="my-1">
            {key}: {value}
          </li>
        ))}
      </ul>
      <div className="flex flex-col space-y-2 max-w-xs">
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="border p-1"
        >
          {Object.keys(balances).map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-1"
        />
        <div className="flex space-x-2">
          <button onClick={handleDeposit} className="bg-green-500 text-white px-2 py-1">
            Deposit
          </button>
          <button onClick={handleWithdraw} className="bg-red-500 text-white px-2 py-1">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
