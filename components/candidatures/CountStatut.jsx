"use client";
import React from 'react'

export default async function CountStatut() {
    const candidatures = await Candidature.find({ status: "En attente" });

    return (
        <div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
