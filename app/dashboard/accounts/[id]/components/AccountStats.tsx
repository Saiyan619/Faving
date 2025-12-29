"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRightLeft, DollarSign } from "lucide-react";

interface AccountStatsProps {
    accountId: string;
}

// Placeholder stats - ready for API integration
const mockStats = {
    totalIncome: 150000,    // $1,500.00 in cents
    totalExpense: 85000,    // $850.00 in cents
    monthlyAvg: 32500,      // $325.00 in cents
    transactions: 24,
};

// Helper to format currency (converts cents to display value)
const formatCurrency = (amountInCents: number, currency: string = "USD") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

export function AccountStats({ accountId }: AccountStatsProps) {
    // TODO: Replace with actual API call using accountId
    // const { stats, isPending } = useGetAccountStats(accountId);

    const stats = [
        {
            title: "Total Income",
            value: formatCurrency(mockStats.totalIncome),
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
        },
        {
            title: "Total Expenses",
            value: formatCurrency(mockStats.totalExpense),
            icon: TrendingDown,
            color: "text-rose-600",
            bg: "bg-rose-100",
        },
        {
            title: "Monthly Avg",
            value: formatCurrency(mockStats.monthlyAvg),
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Total Transactions",
            value: mockStats.transactions.toString(),
            icon: ArrowRightLeft,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card
                        key={stat.title}
                        className="bg-white border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <Icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
