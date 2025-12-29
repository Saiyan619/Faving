"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAllAccounts } from "@/apis/accounts"
import { useAddIncome } from "@/apis/incomeTransactions"
import { useState } from "react"

export function IncomeDialog() {
    const { accounts, isPending: isLoadingAccounts } = useGetAllAccounts();
    const { addincome, isPending } = useAddIncome();

    const [open, setOpen] = useState(false);
    const [accountId, setAccountId] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addincome({
                accountId,
                amount: Number(amount) * 100, // Convert to cents
                category,
                note,
                date,
            });

            // Reset form and close
            setAccountId("");
            setCategory("");
            setAmount("");
            setNote("");
            setDate(new Date().toISOString().split('T')[0]);
            setOpen(false);
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-500">+ Add Income</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Income</DialogTitle>
                        <DialogDescription>
                            Add a new income entry here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* Account Selection */}
                        <div className="grid gap-2">
                            <Label htmlFor="account">Account</Label>
                            <Select value={accountId} onValueChange={setAccountId} required>
                                <SelectTrigger id="account">
                                    <SelectValue placeholder={isLoadingAccounts ? "Loading accounts..." : "Select an account"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts?.map((account) => (
                                        <SelectItem key={account._id} value={account._id}>
                                            {account.name} ({account.currency})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="income-category">Category</Label>
                            <Input
                                id="income-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., Salary, Freelance"
                                required
                            />
                        </div>

                        {/* Amount */}
                        <div className="grid gap-2">
                            <Label htmlFor="income-amount">Amount</Label>
                            <Input
                                id="income-amount"
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="income-date">Date</Label>
                            <Input
                                id="income-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* Note */}
                        <div className="grid gap-2">
                            <Label htmlFor="income-note">Note (Optional)</Label>
                            <Input
                                id="income-note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Optional note"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500"
                            disabled={isPending || !accountId}
                        >
                            {isPending ? "Adding..." : "Add Income"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
