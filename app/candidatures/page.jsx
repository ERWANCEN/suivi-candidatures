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

  return (
    <div className=''>
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
