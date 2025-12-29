"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
    netFlow: {
        label: "Monthly Net Flow",
        color: "#8b5cf6",
    },
    savings: {
        label: "Cumulative Savings",
        color: "#06b6d4",
    },
} satisfies ChartConfig;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthlyTrends() {
    const { data: monthlyStats, isLoading } = useGetMonthlyStats();

    const formatCurrency = (amountInCents: number) => {
        const amount = Math.abs(amountInCents / 100);
        const prefix = amountInCents < 0 ? "-" : "";
        return prefix + new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    if (isLoading) {
        return (
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[250px] w-full" />
                </CardContent>
            </Card>
        );
    }

    // Process data for trends
    let runningSavings = 0;
    const now = new Date();
    const currentYear = now.getFullYear();
    const trendData = months.map((monthName, index) => {
        const m = index + 1;
        const found = monthlyStats?.find(s => s._id.month === m && s._id.year === currentYear);
        const netFlow = (found?.totalIncome || 0) - (found?.totalExpense || 0);
        runningSavings += netFlow;

        return {
            month: monthName,
            netFlow: netFlow / 100,
            savings: runningSavings / 100,
        };
    });

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Monthly Trends</CardTitle>
                        <CardDescription>Track your financial progress over time</CardDescription>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-violet-500" />
                            <span className="text-sm text-muted-foreground">Net Flow</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-500" />
                            <span className="text-sm text-muted-foreground">Cumulative Savings</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "#888" }}
                        />
                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "#888" }}
                            tickFormatter={(value) => `$${value >= 1000 || value <= -1000 ? `${(value / 1000).toFixed(1)}k` : value}`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "#888" }}
                            tickFormatter={(value) => `$${value >= 1000 || value <= -1000 ? `${(value / 1000).toFixed(1)}k` : value}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="netFlow"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="savings"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            dot={{ fill: "#06b6d4", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
