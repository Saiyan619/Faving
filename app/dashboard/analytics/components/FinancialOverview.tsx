"use client";

import { TrendingUp, TrendingDown, PiggyBank, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOverview } from "@/apis/stats";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialOverview() {
    const { data: metrics, isLoading } = useGetOverview();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD" // Default to USD or fetch from user settings if available
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-white">
                        <CardContent className="pt-6">
                            <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const totalIncome = metrics?.totalIncome || 0;
    const totalExpenses = metrics?.totalExpense || 0;
    const netSavings = metrics?.netBalance || 0;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

    const cards = [
        {
            title: "Total Income",
            value: formatCurrency(totalIncome),
            icon: TrendingUp,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },
        {
            title: "Total Expenses",
            value: formatCurrency(totalExpenses),
            icon: TrendingDown,
            iconBg: "bg-rose-100",
            iconColor: "text-rose-600",
        },
        {
            title: "Net Savings",
            value: formatCurrency(netSavings),
            icon: PiggyBank,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            subtitle: "Income - Expenses",
        },
        {
            title: "Savings Rate",
            value: `${savingsRate.toFixed(1)}%`,
            icon: Target,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            subtitle: "of total income",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <Card key={index} className="shadow-sm border-none bg-white hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className={`h-12 w-12 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">{card.title}</p>
                                <p className="text-2xl font-bold mt-1">{card.value}</p>
                                {card.subtitle && (
                                    <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
