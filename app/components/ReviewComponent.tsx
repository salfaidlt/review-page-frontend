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
    const {user} = useUser()
    const sortedComments = review.reviewComments.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
            addCommentToReview(comment, user?.primaryEmailAddress?.emailAddress, review.id)
            
        } else{
            toast.error("You have to login first !")
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="review-header mb-4">
                <h2 className="text-2xl font-bold mb-2">{review.service}</h2>
                <p className="text-gray-700 mb-1">Rating: {review.rating}</p>
                <p className="text-gray-700 mb-1">Comment: {review.comment}</p>
                <p className="text-gray-700 mb-1">Posted by: {review.user.name}</p>
                <p className="text-gray-500 text-sm">Posted on: {new Date(review.createdAt).toLocaleString()}</p>
            </div>
            <div className="review-comments mb-4">
                <h3 className="text-xl font-semibold mb-2">Comments {review.reviewComments.length} </h3>
                {sortedComments.map((comment) => (
                    <div key={comment.id} className="comment mb-2">
                        <p className="text-gray-700">{comment.user.name}: {comment.content}</p>
                        <p className="text-gray-500 text-sm">Posted on: {new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
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
            {/* <div className="review-likes">
        <h3 className="text-xl font-semibold mb-2">Likes</h3>
        <p className="text-gray-700">{review.reviewLikes.length} likes</p>
      </div> */}
        </div>
    );
};

export default ReviewComponent;
