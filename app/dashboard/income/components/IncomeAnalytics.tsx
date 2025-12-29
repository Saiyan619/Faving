"use client"
import { TrendingDown, TrendingUp, DollarSign, Calendar } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetTransactions } from "@/apis/transactions"
import { useGetIncomeCategories, useGetOverview } from "@/apis/stats"
import { Skeleton } from "@/components/ui/skeleton"

const INCOME_COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899"];

export function IncomeAnalytics() {
    const { data: transactionsData, isLoading: isLoadingTransactions } = useGetTransactions();
    const { data: categoryData, isLoading: isLoadingCategories } = useGetIncomeCategories();
    const { data: overview, isLoading: isLoadingOverview } = useGetOverview();

    const isLoading = isLoadingTransactions || isLoadingCategories || isLoadingOverview;

    const incomeTransactions = transactionsData?.transactions.filter((transaction) => transaction.type === "income") || [];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="shadow-sm border-none bg-white lg:col-span-2">
                    <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
                    <CardContent className="h-[300px]"><Skeleton className="h-full w-full" /></CardContent>
                </Card>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="shadow-sm border-none bg-white">
                            <CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const pieData = categoryData?.map((cat, index) => ({
        name: cat.category || "Other",
        value: cat.total / 100,
        color: INCOME_COLORS[index % INCOME_COLORS.length]
    })) || [];

    const chartConfig = pieData.reduce((acc, item) => {
        acc[item.name] = { label: item.name, color: item.color }
        return acc
    }, {} as ChartConfig);

    const totalIncome = (overview?.totalIncome || 0) / 100;
    const avgTransaction = incomeTransactions.length > 0 ? totalIncome / incomeTransactions.length : 0;

    // For simplicity, using total income as highest for now if we don't have a specific highest endpoint
    const highestIncome = incomeTransactions.length > 0
        ? Math.max(...incomeTransactions.map(t => t.amount)) / 100
        : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart */}
            <Card className="shadow-sm border-none bg-white lg:col-span-2">
                <CardHeader>
                    <CardTitle>Income Breakdown</CardTitle>
                    <CardDescription>How your income is distributed across sources</CardDescription>
                </CardHeader>
                <CardContent>
                    {pieData.length > 0 ? (
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <ChartContainer config={chartConfig} className="h-[250px] w-full md:w-1/2">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>

                            {/* Legend */}
                            <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
                                {pieData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
                                            <span className="text-xs text-muted-foreground">{formatCurrency(item.value)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                            No income data available yet.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
                {/* Total Monthly */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Income</p>
                                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
                                <TrendingUp className="h-3 w-3" />
                                Live
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Average Daily */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Avg. per Transaction</p>
                                <p className="text-lg font-semibold">{formatCurrency(avgTransaction)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Highest Income */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Highest Single Entry</p>
                                <p className="text-lg font-semibold">{formatCurrency(highestIncome)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Count */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Total Transactions</p>
                            <p className="text-2xl font-bold">{incomeTransactions.length}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
