"use server"

import axios from "axios"

export async function checkAndAddUser (email: string, name: string) {
    if (!email) return

    try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/check-and-add/"
        const existingUser = await axios.post(url, 
            { email, name }
        )
        console.log('====================================');
        console.log(existingUser.data);
        console.log('====================================');
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur: " + error)
    }
}