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
import { useGetExpenseCategories, useGetOverview } from "@/apis/stats"
import { Skeleton } from "@/components/ui/skeleton"

const EXPENSE_COLORS = ["#f43f5e", "#f97316", "#22c55e", "#eab308", "#ec4899", "#8b5cf6", "#ef4444"];

export function ExpenseAnalytics() {
    const { data: transactionsData, isLoading: isLoadingTransactions } = useGetTransactions();
    const { data: categoryData, isLoading: isLoadingCategories } = useGetExpenseCategories();
    const { data: overview, isLoading: isLoadingOverview } = useGetOverview();

    const isLoading = isLoadingTransactions || isLoadingCategories || isLoadingOverview;

    const expenseTransactions = transactionsData?.transactions.filter((transaction) => transaction?.type === "expense") || [];

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
        color: EXPENSE_COLORS[index % EXPENSE_COLORS.length]
    })) || [];

    const chartConfig = pieData.reduce((acc, item) => {
        acc[item.name] = { label: item.name, color: item.color }
        return acc
    }, {} as ChartConfig);

    const totalExpense = (overview?.totalExpense || 0) / 100;
    const avgTransaction = expenseTransactions.length > 0 ? totalExpense / expenseTransactions.length : 0;

    const highestExpense = expenseTransactions.length > 0
        ? Math.max(...expenseTransactions.map(t => t.amount)) / 100
        : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart */}
            <Card className="shadow-sm border-none bg-white lg:col-span-2">
                <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>How your money is distributed across categories</CardDescription>
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
                            No expense data available yet.
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
                                <p className="text-sm text-muted-foreground">Total Spending</p>
                                <p className="text-2xl font-bold text-rose-600">{formatCurrency(totalExpense)}</p>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-600">
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
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Avg. per Transaction</p>
                                <p className="text-lg font-semibold">{formatCurrency(avgTransaction)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Highest Expense */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Highest Single Entry</p>
                                <p className="text-lg font-semibold">{formatCurrency(highestExpense)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Count */}
                <Card className="shadow-sm border-none bg-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Total Transactions</p>
                            <p className="text-2xl font-bold">{expenseTransactions.length}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
