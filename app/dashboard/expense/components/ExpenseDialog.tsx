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
import { useAddExpense } from "@/apis/expenseTransactions"
import { useState } from "react"

export function ExpenseDialog() {
  const { accounts, isPending: isLoadingAccounts } = useGetAllAccounts();
  const { addExpense, isPending } = useAddExpense();

  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addExpense({
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
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rose-600 hover:bg-rose-500">+ Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Add a new expense entry here. Click save when you&apos;re done.
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
              <Label htmlFor="expense-category">Category</Label>
              <Input
                id="expense-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Food, Transport, Entertainment"
                required
              />
            </div>

            {/* Amount */}
            <div className="grid gap-2">
              <Label htmlFor="expense-amount">Amount</Label>
              <Input
                id="expense-amount"
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
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Note */}
            <div className="grid gap-2">
              <Label htmlFor="expense-note">Note (Optional)</Label>
              <Input
                id="expense-note"
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
              className="bg-rose-600 hover:bg-rose-500"
              disabled={isPending || !accountId}
            >
              {isPending ? "Adding..." : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
