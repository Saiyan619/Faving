"use client";

import { useState } from "react";
import { BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOverview, useGetMonthlyStats } from "@/apis/stats";
import { useGetTransactions } from "@/apis/transactions";
import { Skeleton } from "@/components/ui/skeleton";

const timeRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" },
    { value: "12m", label: "Last 12 Months" },
];

export function AnalyticsHeader() {
    const [selectedRange, setSelectedRange] = useState("30d");
    const { data: overview, isLoading: isLoadingOverview } = useGetOverview();
    const { data: transactionsData, isLoading: isLoadingTransactions } = useGetTransactions();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    const isLoading = isLoadingOverview || isLoadingTransactions;

    const totalVolume = (overview?.totalIncome || 0) + (overview?.totalExpense || 0);
    const transactionCount = transactionsData?.transactions.length || 0;
    const avgTransaction = transactionCount > 0 ? totalVolume / transactionCount : 0;

    return (
        <div className="w-full rounded-3xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <BarChart3 className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financial Analytics</h1>
                        <p className="text-white/70 mt-1">Comprehensive overview of your financial health</p>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                        {timeRanges.map((range) => (
                            <Button
                                key={range.value}
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedRange(range.value)}
                                className={`text-xs px-3 ${selectedRange === range.value
                                    ? "bg-white text-indigo-700 hover:bg-white hover:text-indigo-700"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {range.label}
                            </Button>
                        ))}
                    </div>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Calendar className="h-4 w-4 mr-2" />
                        Custom
                    </Button>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/60 text-xs font-medium">Total Volume</p>
                    {isLoading ? <Skeleton className="h-6 w-20 mt-1 bg-white/20" /> : <p className="text-xl font-bold mt-1">{formatCurrency(totalVolume)}</p>}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/60 text-xs font-medium">Transactions</p>
                    {isLoading ? <Skeleton className="h-6 w-12 mt-1 bg-white/20" /> : <p className="text-xl font-bold mt-1">{transactionCount}</p>}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/60 text-xs font-medium">Avg. Transaction</p>
                    {isLoading ? <Skeleton className="h-6 w-20 mt-1 bg-white/20" /> : <p className="text-xl font-bold mt-1">{formatCurrency(avgTransaction)}</p>}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/60 text-xs font-medium">Account Status</p>
                    <p className="text-xl font-bold mt-1 text-emerald-300">Healthy</p>
                </div>
            </div>
        </div>
    );
}
