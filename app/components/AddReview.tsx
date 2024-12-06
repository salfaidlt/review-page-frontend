"use client"
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
import { addNewReview } from "@/lib/db-actions"
import React, { useState } from "react"

export function AddReview(props: { email: string }) {
    const [service, setService] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState<number>(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        addNewReview(props.email, service, comment, rating)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add a review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a review</DialogTitle>
                    <DialogDescription>
                        You have already used a service and want to feedback your experience
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="service" className="text-right">
                                Service
                            </Label>
                            <Input
                                id="service"
                                className="col-span-3"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="comment" className="text-right">
                                Comment
                            </Label>
                            <Input
                                id="comment"
                                className="col-span-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">
                                Rating
                            </Label>
                            <Input
                                id="rating"
                                className="col-span-3"
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                min={0}
                                max={5}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
