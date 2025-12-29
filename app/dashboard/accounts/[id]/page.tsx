"use client";

import { useGetAccById, useDeleteAccount } from "@/apis/accounts";
import { useParams, useRouter } from "next/navigation";
import { AccountDetailsHeader } from "./components/AccountDetailsHeader";
import { AccountStats } from "./components/AccountStats";
import { AccountTransactions } from "./components/AccountTransactions";
import { toast } from "sonner";

export default function AccountDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const accountId = params.id as string;

    const { data: account, isPending } = useGetAccById(accountId);
    const { DeleteAcc, isPending: isDeleting } = useDeleteAccount(accountId);

    const handleEdit = () => {
        // TODO: Open edit modal or navigate to edit page
        toast.info("Edit functionality coming soon!");
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
            try {
                await DeleteAcc();
                router.push("/dashboard/accounts");
            } catch (error) {
                console.error("Failed to delete account:", error);
            }
        }
    };

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
            <AccountDetailsHeader
                account={account}
                isLoading={isPending}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AccountStats accountId={accountId} />
            <AccountTransactions accountId={accountId} />
        </div>
    );
}
