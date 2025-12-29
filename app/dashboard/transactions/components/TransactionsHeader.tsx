"use client"

import { ArrowDownUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetTransactions } from "@/apis/transactions";

export function TransactionsHeader() {
    const {data, isLoading} = useGetTransactions();
    return (
        <div className="w-full rounded-3xl h-48 bg-gradient-to-r from-violet-700 to-purple-600 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-md sm:text-lg font-bold tracking-tight">
                        All Transactions
                    </h2>
                    <p className="text-purple-200/80 mt-1">View and manage all your financial activity in one place.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium">
                        This Month: <span className="text-purple-200 font-bold ml-2">{data?.transactions?.length} transactions</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowDownUp className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-purple-200">Net Flow This Month</p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{data?.transactions?.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2)}</h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button className="bg-white text-purple-700 hover:bg-purple-50">
                        <Download className="h-4 w-4 mr-2" />
                        Export All
                    </Button>
                </div>
            </div>
        </div>
    );
}
