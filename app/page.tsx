"use client"
// pages/index.tsx ou pages/home.tsx
import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  name: string;
  service: string;
  comment: string;
  rating: number;
  user: {
    id: string;
    name: string;
    // Ajoutez d'autres champs pertinents
  };
  // reviewComments: any[]; // Remplacez 'any' par le type approprié
  // ReviewLike: any[]; // Remplacez 'any' par le type approprié
  createdAt: string; // ou Date si vous parsez les dates
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const url: string = process.env.NEXT_PUBLIC_BACKEND_URL! + "/"; // Utilisation du non-null assertion

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(url);
        setReviews(response.data); // Accès à 'data' pour obtenir le tableau de reviews
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
              <h2>{review.name}</h2>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
              {/* Affichez d'autres détails si nécessaire */}
            </li>
          ))}
        </ul>
      ) }
      
    </div>
  );
}
