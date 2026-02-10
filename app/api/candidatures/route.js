import { NextResponse } from "next/server";
import connect from "@/libs/mongodb";
import Candidature from "@/models/candidature.model";

export async function GET(req, res) {
    try {
        await connect();

        const candidatures = await Candidature.find();

        return NextResponse.json(candidatures, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET_ATTENTE(req, res) {
    try {
        await connect();

        const candidatures = await Candidature.find({ statut: "En attente" });

        return NextResponse.json(candidatures, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET_ACCEPTE(req, res) {
    try {
        await connect();

        const candidatures = await Candidature.find({ statut: "Acccepté" });

        return NextResponse.json(candidatures, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}