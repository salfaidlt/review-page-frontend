"use client"
import React, { useState } from 'react';
import { Review } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { addCommentToReview } from '@/lib/db-actions';

interface ReviewComponentProps {
    review: Review;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review }) => {
    const [comment, setComment] = useState("")
    const { user } = useUser()
    const sortedComments = review.reviewComments.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
            addCommentToReview(comment, user?.primaryEmailAddress?.emailAddress, review.id)

        } else {
            toast.error("You have to login first !")
        }
    }

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
        }
        if (rating < 5)
            stars.push(<span key={stars.length + 1} className="text-gray-300">★</span>);
        return stars;
    };


    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="review-header mb-4">
                <div className='flex flex-col mb-2'>
                    <div className="text-3xl font-bold">{review.service}</div>
                    <p className="text-gray-400 mb-1 text-xs">posted by {review.user.name} on {new Date(review.createdAt).toLocaleString()}</p>
                </div>
                <hr />
                <p className="text-gray-700 mb-1">Rating: {review.rating}/5 {renderStars(review.rating)}</p>
                <br />
                <p className="text-gray-700 mb-1">Review: {review.comment}</p>
            </div>
            <div className="review-comments mb-4">
                <div className="collapse bg-gray-100">
                    <input type="checkbox" />
                    <div className="collapse-title font-bold">Comments {review.reviewComments.length}</div>
                    <div className="collapse-content">
                        {sortedComments.map((comment) => (
                            <div key={comment.id} className="comment mb-2">
                                <p className="text-foreground">{comment.user.name}: {comment.content}</p>
                                <p className="text-gray-400 text-sm font-extralight">posted on: {new Date(comment.createdAt).toLocaleString()}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />

                <form onSubmit={handleSubmit} className='flex justify-between gap-3'>
                    <Input
                        id="comment"
                        placeholder='it goes here...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default ReviewComponent;
