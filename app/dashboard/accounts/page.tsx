"use client";

import { useGetAllAccounts } from "@/apis/accounts";
import { AccountsHeader } from "./components/AccountsHeader";
import { AccountsList } from "./components/AccountsList";

export default function AccountsPage() {
    const { accounts, isPending } = useGetAllAccounts();

    // Calculate total balance
    const totalBalance = accounts?.reduce((sum, acc) => sum + acc.balance, 0) || 0;
    const accountCount = accounts?.length || 0;

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
            <AccountsHeader totalBalance={totalBalance} accountCount={accountCount} />
            <AccountsList accounts={accounts} isLoading={isPending} />
        </div>
    );
}
