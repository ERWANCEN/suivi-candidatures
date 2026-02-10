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
        <div className="">
            <form onSubmit={handleSubmit}>
                {FORM_CANDIDATURE.map(field => (
                    <div key={field.id}>
                        <label className={field.classNameLabel} htmlFor={field.id} >{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            className={field.classNameInput}
                            id={field.id}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button className="" >Valider</button>
            </form>
        </div>
    )
}

export default FormCandidature;