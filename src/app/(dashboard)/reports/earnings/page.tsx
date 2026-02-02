"use client";

import React from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Filter,
  Wallet
} from "lucide-react";

export default function EarningsReportPage() {
  const earningsData = [
    { month: "Jan", amount: 45000, expenses: 12000 },
    { month: "Feb", amount: 52000, expenses: 14000 },
    { month: "Mar", amount: 48000, expenses: 11000 },
    { month: "Apr", amount: 61000, expenses: 18000 },
    { month: "May", amount: 55000, expenses: 15000 },
    { month: "Jun", amount: 67000, expenses: 16000 },
  ];

  const maxAmount = Math.max(...earningsData.map(d => d.amount));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Financial Performance</p>
          <h2 className="text-3xl font-bold text-slate-900">Earnings Report</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar size={18} />
            Last 6 Months
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp size={14} />
              +12.5%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Total Revenue (YTD)</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₱328,000</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <TrendingDown size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <TrendingUp size={14} />
              +5.2%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Total Expenses (YTD)</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₱86,000</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Wallet size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp size={14} />
              +15.8%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">Net Profit</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₱242,000</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {earningsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className="w-full max-w-[40px] bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-500 relative group-hover:shadow-lg"
                    style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ₱{data.amount.toLocaleString()}
                    </div>
                  </div>
                  <div 
                    className="w-full max-w-[40px] bg-slate-200 rounded-t-lg absolute bottom-0 -z-10"
                    style={{ height: `${(data.expenses / maxAmount) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-3 h-3 bg-slate-200 rounded-full" />
              <span>Expenses</span>
            </div>
          </div>
        </div>

        {/* Breakdown by Asset Type */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Revenue by Asset</h3>
          <div className="space-y-6">
            {[
              { label: "Cars (Sedan/SUV)", value: 45, amount: "₱147,600", color: "bg-indigo-600" },
              { label: "Vans", value: 30, amount: "₱98,400", color: "bg-purple-500" },
              { label: "Motorcycles", value: 15, amount: "₱49,200", color: "bg-emerald-500" },
              { label: "Buses", value: 10, amount: "₱32,800", color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900">{item.amount}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color}`} 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Top Performer</p>
            <p className="text-sm font-bold text-slate-900">Toyota Vios 2023 (NGA 1234)</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">Generated ₱24,500 this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
