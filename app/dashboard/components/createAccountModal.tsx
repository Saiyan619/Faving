import { useCreateAccount } from "@/apis/accounts"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

export function CreateAccountModal() {
    const { CreateAcc, isPending } = useCreateAccount();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [balance, setBalance] = useState("")
    const [currency, setCurrency] = useState("")

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            name,
            type,
            balance: Number(balance),
            currency
        }
        console.log("Submitting:", data);
        
        try {
            await CreateAcc(data);
            console.log("Success!");
            
            // Reset and close dialog
            setName("");
            setType("");
            setBalance("");
            setCurrency("");
            setOpen(false);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-12 h-12 rounded-full bg-teal-800/50 flex items-center justify-center mb-3 hover:bg-teal-700/50 transition-colors">
                    <Plus className="w-6 h-6 text-teal-200" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreate}>
                    <DialogHeader>
                        <DialogTitle>Add Account</DialogTitle>
                        <DialogDescription>
                            Add a new account here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Main Bank"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Input 
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="e.g., Bank, Cash, Card"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="balance">Balance</Label>
                            <Input 
                                id="balance"
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Input 
                                id="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                placeholder="NGN, USD, EUR"
                                required
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
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Account"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}