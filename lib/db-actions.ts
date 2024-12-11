"use server"

import axios from "axios"

export async function checkAndAddUser (
    email: string, name: string, 
    setNewUser: (arg0: boolean) => void ) {
        
    if (!email) return

    try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/check-and-add/"
        const existingUser = await axios.post(url, 
            { email, name }
        )
        if (existingUser.status === 201)
            setNewUser(true)
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur: " + error)
    }
}

export async function addNewReview( email: string, service: string, comment: string, rating: number ) {
    if (!email || !service || !comment || !rating) return

    try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews/add-new/"
        const review = await axios.post(url, 
            { email, service, comment, rating }
        )
        console.log('====================================');
        console.log(review.data);
        console.log('====================================');
    } catch (error) {
        console.error(error)
    }
}

export async function addCommentToReview(comment: string, email: string, reviewId: string) {
    if (!comment || !email || !reviewId) return

    try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews/add-comment/"
        const comment_ = await axios.post(url, 
            { comment, email, reviewId }
        )
        console.log('====================================');
        console.log(comment_.data);
        console.log('====================================');
    } catch (error) {
        console.error(error)
    }
}