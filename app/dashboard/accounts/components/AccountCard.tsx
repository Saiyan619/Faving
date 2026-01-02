"use client";

import { Account } from "@/apis/accounts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, MoreHorizontal, Landmark, Smartphone, PiggyBank } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountCardProps {
    account: Account;
}

// Get icon and color based on account type
const getAccountStyle = (type: string) => {
    switch (type.toLowerCase()) {
        case "bank":
            return { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", icon: Landmark };
        case "savings":
            return { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", icon: PiggyBank };
        case "cash":
            return { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", icon: Wallet };
        case "mobile money":
            return { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", icon: Smartphone };
        case "card":
            return { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", icon: CreditCard };
        default:
            return { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-200", icon: Wallet };
    }
};

// Helper to format currency (converts cents to display value)
const formatCurrency = (amountInCents: number, currency: string = "EUR") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

export function AccountCard({ account }: AccountCardProps) {
    const style = getAccountStyle(account.type);
    const Icon = style.icon;

    return (
        // <Link href={`/dashboard/accounts/${account._id}`}>
            <Card className={`group relative bg-white border ${style.border} hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1`}>
                <CardContent className="p-5">
                    {/* Header: Icon and Menu */}
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${style.bg}`}>
                            <Icon className={`w-6 h-6 ${style.text}`} />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.preventDefault()}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 cursor-pointer">
                                    Delete Account
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Account Name */}
                    <p className="text-gray-600 text-sm font-medium mb-1 truncate">
                        {account.name}
                    </p>

                    {/* Balance */}
                    <p className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
                        {formatCurrency(account.balance, account.currency)}
                    </p>

                    {/* Footer: Type and Currency */}
                    <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${style.bg} ${style.text} font-medium capitalize`}>
                            {account.type}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{account.currency}</span>
                    </div>
                </CardContent>
            </Card>
        // </Link>
    );
}
