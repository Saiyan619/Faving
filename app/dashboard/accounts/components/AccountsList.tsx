"use client";

import { Account } from "@/apis/accounts";
import { AccountCard } from "./AccountCard";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";

interface AccountsListProps {
    accounts: Account[] | undefined;
    isLoading?: boolean;
}

export function AccountsList({ accounts, isLoading }: AccountsListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter accounts based on search query
    const filteredAccounts = accounts?.filter(
        (account) =>
            account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-44 rounded-xl bg-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
            </div>

            {/* Accounts Grid */}
            {filteredAccounts && filteredAccounts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAccounts.map((account) => (
                        <AccountCard key={account._id} account={account} />
                    ))}

                    {/* Add New Account Card */}
                    <Card className="border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group">
                        <CardContent className="flex flex-col items-center justify-center h-full min-h-[180px] p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-3 transition-colors">
                                <Plus className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium group-hover:text-blue-700 transition-colors">Add New Account</span>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl bg-gray-50 border border-dashed border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 text-lg font-medium mb-1">
                        {searchQuery ? "No accounts found" : "No accounts yet"}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {searchQuery
                            ? "Try adjusting your search terms"
                            : "Create your first account to get started"}
                    </p>
                </div>
            )}
        </div>
    );
}
