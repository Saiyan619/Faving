"use client"
import { Button } from "@/components/ui/button";
import { IncomeDialog } from "./IncomeDialog";
import { useGetTransactions } from "@/apis/transactions";
import { Skeleton } from "@/components/ui/skeleton";

export function IncomeOverviewHeader() {
    const { data, isLoading } = useGetTransactions();

    const incomeTransactions = data?.transactions.filter((transaction) => transaction?.type === "income") || [];
    const totalAmountInCents = incomeTransactions.reduce((total, income) => total + income.amount, 0);
    const totalAmount = totalAmountInCents / 100;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="w-full rounded-3xl h-48 bg-emerald-700 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                <div className="animate-pulse flex flex-col justify-between h-full">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32 bg-white/20" />
                        <Skeleton className="h-4 w-64 bg-white/20" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-48 bg-white/20" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-28 bg-white/20" />
                            <Skeleton className="h-10 w-28 bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-3xl h-48 bg-emerald-700 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-md sm:text-lg font-bold tracking-tight">
                        Total Income
                    </h2>
                    <p className="text-emerald-200/80 mt-1">Track all your earnings and revenue streams.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-lg bg-emerald-900/50 backdrop-blur-sm border border-white/10 text-sm font-medium">
                        Transactions: <span className="text-emerald-300 font-bold ml-2">{incomeTransactions.length}</span>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">{formatCurrency(totalAmount)}</h2>
                </div>

                <div className="flex gap-2">
                    <IncomeDialog />
                    <Button className="bg-white text-emerald-700 hover:bg-emerald-50">Export Income</Button>
                </div>
            </div>
        </div>
    );
}
