"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetMonthlyStats } from "@/apis/stats"
import { Skeleton } from "@/components/ui/skeleton"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartConfig = {
    income: {
        label: "Income",
        color: "#10b981", // emerald-500
    },
    expense: {
        label: "Expense",
        color: "#f43f5e", // rose-500
    },
} satisfies ChartConfig

export function OverviewChart() {
    const { data: monthlyStats, isLoading } = useGetMonthlyStats();

    if (isLoading) {
        return (
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        );
    }

    // Get last 6 months of data
    const last6Months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const m = d.getMonth() + 1;
        const y = d.getFullYear();

        const found = monthlyStats?.find(s => s._id.month === m && s._id.year === y);
        last6Months.push({
            month: months[m - 1],
            income: (found?.totalIncome || 0) / 100,
            expense: (found?.totalExpense || 0) / 100,
        });
    }

    // Calculate growth compared to previous month
    const currentData = last6Months[5];
    const prevData = last6Months[4];
    const incomeGrowth = prevData.income > 0
        ? ((currentData.income - prevData.income) / prevData.income) * 100
        : 0;

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Income vs Expenses - Last 6 Months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
                    <BarChart accessibilityLayer data={last6Months}>
                        <CartesianGrid vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {incomeGrowth >= 0 ? (
                        <>
                            Income up by {incomeGrowth.toFixed(1)}% this month <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </>
                    ) : (
                        <>
                            Income down by {Math.abs(incomeGrowth).toFixed(1)}% this month <TrendingDown className="h-4 w-4 text-rose-500" />
                        </>
                    )}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total income and expenses for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
