"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetMonthlyStats } from "@/apis/stats";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
    income: {
        label: "Income",
        color: "#10b981",
    },
    expense: {
        label: "Expenses",
        color: "#f43f5e",
    },
} satisfies ChartConfig;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function IncomeVsExpenseChart() {
    const { data: monthlyStats, isLoading } = useGetMonthlyStats();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    if (isLoading) {
        return (
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        );
    }

    // Map API data to chart format
    const now = new Date();
    const currentYear = now.getFullYear();
    const chartData = months.map((monthName, index) => {
        const m = index + 1;
        const found = monthlyStats?.find(s => s._id.month === m && s._id.year === currentYear);
        return {
            month: monthName,
            income: (found?.totalIncome || 0) / 100,
            expense: (found?.totalExpense || 0) / 100,
        };
    });

    const totalIncome = monthlyStats?.reduce((sum, d) => sum + d.totalIncome, 0) || 0;
    const totalExpense = monthlyStats?.reduce((sum, d) => sum + d.totalExpense, 0) || 0;

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Income vs Expenses</CardTitle>
                        <CardDescription>Comparison of your cash flow over time</CardDescription>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-sm text-muted-foreground">Income: {formatCurrency(totalIncome)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="text-sm text-muted-foreground">Expenses: {formatCurrency(totalExpense)}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "#888" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "#888" }}
                            tickFormatter={(value) => `$${value >= 1000 ? `${value / 1000}k` : value}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="url(#incomeGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#f43f5e"
                            strokeWidth={2}
                            fill="url(#expenseGradient)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
