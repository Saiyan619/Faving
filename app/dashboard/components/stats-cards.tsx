"use client";

import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOverview } from "@/apis/stats";
import { IncomeDialog } from "@/app/dashboard/income/components/IncomeDialog";
import { ExpenseDialog } from "@/app/dashboard/expense/components/ExpenseDialog";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCards() {
    const { data: overview, isLoading } = useGetOverview();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Income Card */}
            <Card className="shadow-sm border-none bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Income
                    </CardTitle>
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(overview?.totalIncome || 0)}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <span className="text-emerald-600 font-medium flex items-center mr-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Live
                        </span>
                        updated balance
                    </p>
                </CardContent>
            </Card>

            {/* Expense Card */}
            <Card className="shadow-sm border-none bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Expenses
                    </CardTitle>
                    <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                        <ArrowDownRight className="h-4 w-4 text-rose-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(overview?.totalExpense || 0)}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <span className="text-rose-600 font-medium flex items-center mr-1">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Live
                        </span>
                        updated balance
                    </p>
                </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="shadow-sm border-none bg-white hover:shadow-md transition-shadow flex flex-col justify-center">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <IncomeDialog />
                    <ExpenseDialog />
                </CardContent>
            </Card>
        </div>
    );
}
