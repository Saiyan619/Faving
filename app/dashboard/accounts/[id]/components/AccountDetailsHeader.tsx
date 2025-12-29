"use client";

import { Account } from "@/apis/accounts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, Edit, Trash2, Landmark, PiggyBank, Smartphone, CreditCard } from "lucide-react";
import Link from "next/link";

interface AccountDetailsHeaderProps {
    account: Account | undefined;
    isLoading?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

// Get icon and color based on account type
const getAccountStyle = (type: string) => {
    switch (type.toLowerCase()) {
        case "bank":
            return { bg: "bg-emerald-500/20", text: "text-emerald-400", icon: Landmark };
        case "savings":
            return { bg: "bg-blue-500/20", text: "text-blue-400", icon: PiggyBank };
        case "cash":
            return { bg: "bg-amber-500/20", text: "text-amber-400", icon: Wallet };
        case "mobile money":
            return { bg: "bg-purple-500/20", text: "text-purple-400", icon: Smartphone };
        case "card":
            return { bg: "bg-rose-500/20", text: "text-rose-400", icon: CreditCard };
        default:
            return { bg: "bg-teal-500/20", text: "text-teal-400", icon: Wallet };
    }
};

// Helper to format currency (converts cents to display value)
const formatCurrency = (amountInCents: number, currency: string = "EUR") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

// Format date nicely
const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(dateString));
};

export function AccountDetailsHeader({ account, isLoading, onEdit, onDelete }: AccountDetailsHeaderProps) {
    if (isLoading || !account) {
        return (
            <div className="w-full rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl h-64 animate-pulse">
                <div className="h-4 w-32 bg-white/10 rounded mb-8" />
                <div className="h-8 w-48 bg-white/10 rounded mb-4" />
                <div className="h-12 w-64 bg-white/10 rounded" />
            </div>
        );
    }

    const style = getAccountStyle(account.type);
    const Icon = style.icon;

    return (
        <div className="w-full rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10">
                {/* Back Navigation */}
                <Link
                    href="/dashboard/accounts"
                    className="inline-flex items-center gap-2 text-teal-200/80 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Accounts</span>
                </Link>

                {/* Main Content */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                    <div className="flex items-start gap-4">
                        {/* Account Icon */}
                        <div className={`p-4 rounded-2xl ${style.bg}`}>
                            <Icon className={`w-8 h-8 ${style.text}`} />
                        </div>

                        {/* Account Info */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    {account.name}
                                </h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} capitalize`}>
                                    {account.type}
                                </span>
                            </div>

                            {/* Balance */}
                            <p className="text-4xl sm:text-5xl font-bold text-white mb-3">
                                {formatCurrency(account.balance, account.currency)}
                            </p>

                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-teal-200/70 text-sm">
                                <span>Currency: {account.currency}</span>
                                <span className="text-teal-200/40">•</span>
                                <span>Created: {formatDate(account.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 gap-2"
                            onClick={onEdit}
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            className="border-red-400/30 text-red-300 hover:bg-red-500/20 hover:text-red-200 gap-2"
                            onClick={onDelete}
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
