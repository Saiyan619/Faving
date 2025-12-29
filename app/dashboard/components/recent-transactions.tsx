"use client";

import { ShoppingBag, Home, Zap, DollarSign, Briefcase, Laptop, Utensils, Car, Heart, Zap as Energy, CreditCard } from "lucide-react";
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
    Utilities: Energy,
    Entertainment: Heart,
    Investment: DollarSign,
    Other: CreditCard,
};

const CATEGORY_COLORS: Record<string, string> = {
    Salary: "bg-emerald-100 text-emerald-600",
    Freelance: "bg-blue-100 text-blue-600",
    Rental: "bg-indigo-100 text-indigo-600",
    Shopping: "bg-rose-100 text-rose-600",
    Housing: "bg-amber-100 text-amber-600",
    Food: "bg-orange-100 text-orange-600",
    Transport: "bg-purple-100 text-purple-600",
    Utilities: "bg-yellow-100 text-yellow-600",
    Entertainment: "bg-pink-100 text-pink-600",
    Investment: "bg-cyan-100 text-cyan-600",
    Other: "bg-gray-100 text-gray-600",
};

export function RecentTransactions() {
    const { data: transactionsData, isLoading } = useGetTransactions();

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(date);
    };

    if (isLoading) {
        return (
            <Card className="shadow-sm border-none bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-16" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const transactions = transactionsData?.transactions.slice(0, 5) || [];

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activity</CardDescription>
                </div>
                <Link href="/dashboard/transactions">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        View All
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {transactions.length > 0 ? transactions.map((tx) => {
                        const Icon = CATEGORY_ICONS[tx.category] || CreditCard;
                        const colorClass = CATEGORY_COLORS[tx.category] || "bg-gray-100 text-gray-600";
                        const sign = tx.type === 'income' ? '+' : '-';

                        return (
                            <div key={tx._id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                                            {tx.note || tx.category}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                                    </div>
                                </div>
                                <div className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {sign} {formatCurrency(tx.amount)}
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-sm text-gray-500 text-center py-4">No recent transactions found</p>
                    )}
                </div>

                <Link href="/dashboard/transactions">
                    <Button variant="ghost" className="w-full mt-6 sm:hidden text-muted-foreground">
                        View All Transactions
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
