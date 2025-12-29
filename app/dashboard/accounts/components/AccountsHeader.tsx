"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, Plus } from "lucide-react";
import Link from "next/link";
import { CreateAccountModal } from "../../components/createAccountModal";

interface AccountsHeaderProps {
    totalBalance: number;
    accountCount: number;
}

// Helper to format currency (converts cents to display value)
const formatCurrency = (amountInCents: number, currency: string = "EUR") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

export function AccountsHeader({ totalBalance, accountCount }: AccountsHeaderProps) {
    return (
        <div className="w-full rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10">
                {/* Back Navigation */}
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-teal-200/80 hover:text-white transition-colors mb-6 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>

                {/* Header Content */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-teal-500/20">
                                <Wallet className="w-6 h-6 text-teal-300" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                All Accounts
                            </h1>
                        </div>
                        <p className="text-teal-200/70 text-sm">
                            Manage all your financial accounts in one place
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Total Balance Card */}
                        <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <p className="text-teal-200/70 text-xs font-medium mb-1">Total Balance</p>
                            <p className="text-xl sm:text-2xl font-bold text-white">
                                {formatCurrency(totalBalance)}
                            </p>
                            <p className="text-teal-300/60 text-xs mt-1">
                                {accountCount} account{accountCount !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Add Account Button */}
                        <CreateAccountModal />
                    </div>
                </div>
            </div>
        </div>
    );
}
