import { NextResponse } from "next/server";
import connect from "@/libs/mongodb";
import Candidature from "@/models/candidature.model";

export async function POST(req, res) {
    try {
        // Établie la connexion à mongoDB
        await connect();

        // Récupère le corps de la requête et la convertit e, JSON
        const body = await req.json();

        // Crée un nouvelle
        const candidature = await Candidature.create(body);

        // Retourne une réponse avec l'article crée et un code 201
        return NextResponse.json(candidature, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
