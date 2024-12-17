"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewComponent from "./components/ReviewComponent";
import { Review } from "@/lib/types";
import GoToTop from "./components/GoToTop";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const url: string = process.env.NEXT_PUBLIC_BACKEND_URL! + "/"; // Utilisation du non-null assertion

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(url);
        setReviews(response.data.reverse()); // Accès à 'data' pour obtenir le tableau de reviews
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <div>
      <h1 className="text-4xl">List of all reviews</h1>
      { reviews.length === 0 ? (
        <div className="text-gray-600">Reviews list is empty</div>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewComponent review={review} />
            </li>
          ))}
        </ul>
      ) }
      <GoToTop />
    </div>
  );
}
