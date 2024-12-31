export interface User {
  id: string;
  name: string;
  email: string;
  reviews: Review[];
  reviewComments: ReviewComment[];
  createdAt: Date;
  reviewLikes: ReviewLike[]
}

export interface Review {
  id: string;
  service: string;
  comment: string;
  rating: number;
  user: User;
  userId: string;
  reviewComments: ReviewComment[];
  createdAt: Date;
  reviewLikes: ReviewLike[]
}

export interface ReviewComment {
  id: string;
  content: string;
  user: User;
  userId: string;
  review: Review;
  reviewId: string;
  createdAt: Date
}

export interface ReviewLike {
  id: string;
  user: User;
  userId: string;
  review: Review;
  reviewId: string;
  createdAt: Date
}
