"use client";

import { ArrowUpRight, ArrowDownRight, Briefcase, ShoppingBag, Home, Laptop, TrendingUp, CreditCard, Utensils, Car, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetTransactions } from "@/apis/transactions";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, any> = {
    Salary: Briefcase,
    Freelance: Laptop,
    Rental: Home,
    Shopping: ShoppingBag,
    Housing: Home,
    Food: Utensils,
    Transport: Car,
    Utilities: Zap,
    Entertainment: Heart,
    Investment: TrendingUp,
    Other: CreditCard,
};

export function TopTransactions() {
    const { data: transactionsData, isLoading } = useGetTransactions();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(dateString));
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-white">
                        <CardHeader className="pb-4">
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(4)].map((_, j) => (
                                <Skeleton key={j} className="h-14 w-full rounded-lg" />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const transactions = transactionsData?.transactions || [];

    const topIncomes = [...transactions]
        .filter(tx => tx.type === "income")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4);

    const topExpenses = [...transactions]
        .filter(tx => tx.type === "expense")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4);

    const renderTransactionItem = (tx: any, index: number, colorClass: string) => {
        const Icon = CATEGORY_ICONS[tx.category] || CreditCard;
        const sign = tx.type === "income" ? "+" : "-";

        return (
            <div key={tx._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '100')} ${colorClass} font-bold text-sm`}>
                        {index + 1}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{tx.category}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(tx.date)} • {tx.note || tx.category}</p>
                    </div>
                </div>
                <span className={`text-sm font-bold ${colorClass}`}>{sign} {formatCurrency(tx.amount)}</span>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Incomes */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                            <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                            Top Income
                        </CardTitle>
                        <CardDescription>Largest income this month</CardDescription>
                    </div>
                    <Link href="/dashboard/income">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            View All
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topIncomes.length > 0 ? topIncomes.map((tx, index) =>
                        renderTransactionItem(tx, index, "text-emerald-600")
                    ) : <p className="text-sm text-gray-500 text-center py-4">No income transactions found</p>}
                </CardContent>
            </Card>

            {/* Top Expenses */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                            <ArrowDownRight className="h-5 w-5 text-rose-500" />
                            Top Expenses
                        </CardTitle>
                        <CardDescription>Largest expenses this month</CardDescription>
                    </div>
                    <Link href="/dashboard/expense">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            View All
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topExpenses.length > 0 ? topExpenses.map((tx, index) =>
                        renderTransactionItem(tx, index, "text-rose-600")
                    ) : <p className="text-sm text-gray-500 text-center py-4">No expense transactions found</p>}
                </CardContent>
            </Card>
        </div>
    );
}
