"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { FORM_USER } from '@/utils/constant/form';
import { URL } from '@/utils/constant/url';

export const FormRegister = () => {
    const [register, setRegister] = useState({
        nom:'',
        mail:'',
        mdp:''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegister(prevRegister => ({ ...prevRegister, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URL.USER_POST, register);
        } catch (error) {
            console.log(error.message);
        };
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                {FORM_USER.map(field => (
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

export default FormRegister;