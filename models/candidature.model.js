import React from 'react';
import mongoose from 'mongoose';

const CandidatureSchema = new mongoose.Schema(
    {
        entreprise: {
            type: String,
            required: true,
        },
        poste: {
            type: String,
            required: true
        },
        lien: {
            type: String,
            required: true
        },
        statut: {
            type: String,
            enum: ["Accepté", "En attente", "Refusé"],
            default: "En attente"
        }
    }, { timestamps: true }
);

export default mongoose.models.Candidature || mongoose.model("Candidature", CandidatureSchema);