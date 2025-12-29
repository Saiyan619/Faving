import { Plus, Wallet, TrendingUp, CreditCard, MoreHorizontal, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Account } from "@/apis/accounts";
import { CreateAccountModal } from "./createAccountModal";
import Link from "next/link";

interface AccountsOverviewProps {
    userName?: string;
    accounts: Account[] | undefined;
}

// Helper to format currency (converts cents to display value)
const formatCurrency = (amountInCents: number, currency: string = "EUR") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(amount);
};

// Get icon color based on account type
const getAccountStyle = (type: string) => {
    switch (type.toLowerCase()) {
        case "bank":
            return { bg: "bg-emerald-500/20", text: "text-emerald-300", icon: Wallet };
        case "savings":
            return { bg: "bg-blue-500/20", text: "text-blue-300", icon: CreditCard };
        case "cash":
            return { bg: "bg-amber-500/20", text: "text-amber-300", icon: Wallet };
        case "mobile money":
            return { bg: "bg-purple-500/20", text: "text-purple-300", icon: CreditCard };
        default:
            return { bg: "bg-teal-500/20", text: "text-teal-300", icon: Wallet };
    }
};

export function AccountsOverview({ userName, accounts }: AccountsOverviewProps) {
    // Calculate total balance from all accounts
    const totalBalance = accounts?.reduce((sum, acc) => sum + acc.balance, 0) || 0;

    return (
        <div className="w-full rounded-3xl bg-blue-800 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Welcome back, {userName || "User"}
                    </h2>
                    <p className="text-teal-200/80 mt-1">Here's what's happening with your finance.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-lg bg-teal-800/50 backdrop-blur-sm border border-white/10 text-sm font-medium">
                        Total Balance: <span className="text-emerald-300 font-bold ml-2">{formatCurrency(totalBalance)}</span>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Render account cards dynamically */}
                {accounts && accounts.length > 0 ? (
                    accounts.slice(0, 2).map((account) => {
                        const style = getAccountStyle(account.type);
                        const Icon = style.icon;

                        return (
                            <Card
                                key={account._id}
                                className="bg-white/10 backdrop-blur-md border-white/10 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className={`p-2 rounded-full ${style.bg} ${style.text}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-teal-200/50 hover:text-white hover:bg-white/10">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-teal-100 text-sm font-medium mb-1">{account.name}</p>
                                    <CardTitle className="text-2xl font-bold tracking-wide">
                                        {formatCurrency(account.balance, account.currency)}
                                    </CardTitle>
                                    <div className="mt-2 flex items-center text-teal-300/80 text-xs font-medium">
                                        <span className="capitalize">{account.type}</span>
                                        <span className="mx-2">•</span>
                                        <span>{account.currency}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="col-span-2 flex items-center justify-center p-8 rounded-xl bg-white/5 border border-dashed border-white/20">
                        <p className="text-teal-200/70">No accounts yet. Create your first account!</p>
                    </div>
                )}

                {/* Card: Add Account */}
                <Card className="bg-transparent border-2 border-dashed border-teal-600/50 hover:border-teal-400 hover:bg-teal-800/20 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[160px] shadow-none">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full w-full">
                        <CreateAccountModal />
                        <span className="text-teal-100 font-medium">Add New Account</span>
                    </CardContent>
                </Card>
            </div>

            {/* View All Link */}
            <div className="relative z-10 mt-6 flex justify-center">
                <Link href="/dashboard/accounts">
                    <Button variant="ghost" className="text-teal-200 hover:text-white hover:bg-white/10 gap-2 group">
                        View All Accounts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
