"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { FORM_CANDIDATURE } from '@/utils/constant/form';
import { URL } from '@/utils/constant/url';

export const FormCandidature = () => {
    const [candidature, setCandidature] = useState({
        entreprise: '',
        poste: '',
        lien: '',
        statut: 'En attente'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCandidature(prevCandidature => ({ ...prevCandidature, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URL.CANDIDATURE_POST, candidature);
        } catch (error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        };
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                
                {/* En-tête */}
                <div className="bg-indigo-600 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Nouvelle Candidature
                    </h2>
                    <p className="text-indigo-100 text-sm mt-1">
                        Sélectionne le statut actuel de ta demande
                    </p>
                </div>

                {/* Corps du formulaire */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {FORM_CANDIDATURE.map(field => (
                            <div key={field.id} className="relative">
                                <label 
                                    htmlFor={field.id} 
                                    className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
                                >
                                    {field.label}
                                </label>

                                {/* Condition : Si le champ est le statut, on affiche un Select */}
                                {field.name === "statut" ? (
                                    <select
                                        name={field.name}
                                        id={field.id}
                                        value={candidature.statut}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="En attente">En attente</option>
                                        <option value="Accepté">Accepté</option>
                                        <option value="Refusée">Refusé</option>
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        value={candidature[field.name] || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                                    />
                                )}
                            </div>
                        ))}

                        <button 
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-4"
                        >
                            Valider la candidature
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormCandidature;