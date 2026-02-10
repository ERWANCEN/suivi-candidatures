import { NextResponse } from "next/server";
import connect from "@/libs/mongodb";
import User from "@/models/user.model"; // Vérifie que le chemin est bon
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connect();

        // 1. On récupère les données (ATTENTION: on utilise await req.json())
        // On ne doit JAMAIS utiliser req.body ici
        const { nom, mail, mdp } = await req.json();

        // 2. Vérification que tout est là
        if (!nom || !mail || !mdp) {
            return NextResponse.json(
                { message: 'Remplissez tous les champs !' },
                { status: 400 }
            );
        }

        // 3. On crypte le mot de passe
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // 4. On crée l'utilisateur
        // On mappe les valeurs sur les champs de ton UserSchema
        const user = await User.create({
            nom: nom,
            mail: mail,
            mdp: hashedPassword // On stocke le mot de passe crypté dans le champ 'mdp'
        });

        return NextResponse.json({ message: "Utilisateur créé", user }, { status: 201 });

    } catch (e) {
        console.error("Erreur Register:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}