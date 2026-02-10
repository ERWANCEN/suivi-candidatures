import { NextResponse } from "next/server";
import connect from "@/libs/mongodb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(req, res) {
    try {
        // Établie la connexion à mongoDB
        await connect();

        // Récupère le corps de la requête et la convertit e, JSON
        const { mail, mdp } = await req.json();

        if(!mail || !mdp) return NextResponse.json({ message:'Remplissez tous les champs ! '}, { status: 400 });

        const user = await User.findOne({ email: req.body.email })

        

        const mdpHashed = await User.findOne({mdp: req.body.hashedPassword})
        const hashedPassword = bcrypt.compare(mdp, mdpHashed)

        if(!user || !hashedPassword) return NextResponse.json({message: 'USER NOT FOUND'}, {status: 404}) 

        const token = jwt.sign(
            { id: user._id },
            ENV.TOKEN,
            { expiresIn: "24h" }
        )
        console.log(mail);
        console.log(mail._doc);

        // const { mdpHashed, ...others } = mail._doc

        res.cookie(//C'est une méthode d'Express qui demande au navigateur d'enregistrer une petite information (un cookie) sur l'ordinateur de l'utilisateur
            'access_token', //C'est le nom que tu donnes à ton cookie. C'est l'étiquette collée sur la boîte pour que le serveur puisse la reconnaître plus tard
            token,//C'est la valeur (le contenu) de la boîte. Ici, c'est le badge numérique (JWT) que tu as généré juste au-dessus dans ton code
            { httpOnly: true }//C'est l'option de sécurité indispensable. Elle interdit au JavaScript du navigateur d'accéder à ce cookie. Cela protège l'utilisateur contre les attaques de type XSS (vol de session par script malveillant)
        )
        .status(200)//On "chaîne" l'instruction pour dire au navigateur : "Tout s'est bien passé" (Code 200 OK)
        .json(others);



        // Retourne une réponse avec l'article crée et un code 201
        return NextResponse.json(user, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}