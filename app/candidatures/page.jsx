import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { URL } from '../../utils/constant/url';

async function fetchCandidatures() {
    const res = await fetch(URL.CANDIDATURES_GET, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error('Failed to fetch application');
    }

    return res.json();
}

export default async function candidatures() {
  const candidatures = await fetchCandidatures();
  
  const candidaturesEnAttente = candidatures.filter(
    (item) => item.statut === "En attente"
  );

  const getDifferenceJours = (dateString) => {
      const aujourdhui = new Date();
      const lastUpdate = new Date(dateString);
      const diffTemps = Math.abs(aujourdhui - lastUpdate);
      return Math.ceil(diffTemps / (1000 * 60 * 60 * 24));
  };

  return (
    <div className=''>
        <div>
            <h1>Candidatures à relancer</h1>
            <div>
                {/* Affichage des candidatures à relancer */}
                {candidaturesEnAttente.length > 0 ? (
                    candidaturesEnAttente.map((candidature) => {
                        if (getDifferenceJours(candidature.updatedAt) > 7) {
                            <div key={candidature._id} className="">
                                <h5>{candidature.entreprise}</h5>
                                <p>Statut : {candidature.statut}</p>
                            </div>
                        }
                    })
                ) : (
                <p>Aucune relance pour le moment</p>
                )}
            </div>
        </div>
        <h1 className=''>
            Les candidatures
        </h1>
        <div className=''>
            {/* Affichage des candidatures ici ! */}
            {candidatures.map((candidature) => (
                <div key={uuidv4()}>
                    <div className=''>
                        <div className=''>
                            <h5 className=''>
                                {candidature.entreprise}
                            </h5>
                            <p>
                                {candidature.poste}
                            </p>
                            <p>
                                {candidature.lien}
                            </p>
                            <p>
                                {candidature.statut}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
