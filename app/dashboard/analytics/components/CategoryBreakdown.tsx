"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetExpenseCategories, useGetIncomeCategories } from "@/apis/stats";
import { Skeleton } from "@/components/ui/skeleton";

const INCOME_COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#6b7280"];
const EXPENSE_COLORS = ["#f43f5e", "#f97316", "#22c55e", "#eab308", "#ec4899", "#8b5cf6"];

export function CategoryBreakdown() {
    const { data: rawExpenseCats, isLoading: isLoadingExpenses } = useGetExpenseCategories();
    const { data: rawIncomeCats, isLoading: isLoadingIncome } = useGetIncomeCategories();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    if (isLoadingExpenses || isLoadingIncome) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-white">
                        <CardHeader>
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6">
                                <Skeleton className="h-[180px] w-[180px] rounded-full" />
                                <div className="flex-1 space-y-2">
                                    {[...Array(4)].map((_, j) => (
                                        <Skeleton key={j} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const incomeCategories = rawIncomeCats?.map((cat, index) => ({
        name: cat.category || "Other",
        value: cat.total / 100,
        color: INCOME_COLORS[index % INCOME_COLORS.length]
    })) || [];

    const expenseCategories = rawExpenseCats?.map((cat, index) => ({
        name: cat.category || "Other",
        value: cat.total / 100,
        color: EXPENSE_COLORS[index % EXPENSE_COLORS.length]
    })) || [];

    const incomeChartConfig = incomeCategories.reduce((acc, item) => {
        acc[item.name] = { label: item.name, color: item.color };
        return acc;
    }, {} as ChartConfig);

    const expenseChartConfig = expenseCategories.reduce((acc, item) => {
        acc[item.name] = { label: item.name, color: item.color };
        return acc;
    }, {} as ChartConfig);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Categories */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        Income by Category
                    </CardTitle>
                    <CardDescription>Where your money comes from</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <ChartContainer config={incomeChartConfig} className="h-[180px] w-[180px]">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Pie
                                    data={incomeCategories}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                >
                                    {incomeCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="flex-1 w-full space-y-2">
                            {incomeCategories.length > 0 ? incomeCategories.map((cat) => (
                                <div key={cat.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <span className="text-gray-600">{cat.name}</span>
                                    </div>
                                    <div className="font-medium text-gray-900">{formatCurrency(cat.value * 100)}</div>
                                </div>
                            )) : <p className="text-sm text-gray-500">No income data available</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span className="w-3 h-3 rounded-full bg-rose-500" />
                        Expenses by Category
                    </CardTitle>
                    <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <ChartContainer config={expenseChartConfig} className="h-[180px] w-[180px]">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Pie
                                    data={expenseCategories}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                >
                                    {expenseCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="flex-1 w-full space-y-2">
                            {expenseCategories.length > 0 ? expenseCategories.map((cat) => (
                                <div key={cat.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <span className="text-gray-600">{cat.name}</span>
                                    </div>
                                    <div className="font-medium text-gray-900">{formatCurrency(cat.value * 100)}</div>
                                </div>
                            )) : <p className="text-sm text-gray-500">No expense data available</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
