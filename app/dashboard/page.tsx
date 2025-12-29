"use client"
import { useUser } from "@/apis/auth";

import { AccountsOverview } from "@/app/dashboard/components/accounts-overview";
import { StatsCards } from "@/app/dashboard/components/stats-cards";
import { OverviewChart } from "@/app/dashboard/components/overview-chart";
import { RecentTransactions } from "@/app/dashboard/components/recent-transactions";
import { useRouter } from "next/navigation";
import { useGetAllAccounts } from "@/apis/accounts";

import { DashboardSkeleton } from "@/app/dashboard/components/dashboard-skeleton";

export default function DashboardPage() {
    const { user, isPending, isError } = useUser();
    const { accounts, isPending: isAccountsPending } = useGetAllAccounts()
    console.log("Dashboard auth state:", { user, isPending, isError })
    console.log("Accounts:", accounts)
    const router = useRouter()
    // console.log(user)

    if (isPending || isAccountsPending) return <DashboardSkeleton />;

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
            <AccountsOverview accounts={accounts} userName={user?.name} />
            <StatsCards />
            <OverviewChart />
            <RecentTransactions />

            {/* Future sections (Expenses/Recent Transactions) will go here */}
        </div>
    );
}
