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

async function fetchCandidaturesEnAttente() {
    const res = await fetch(URL.CANDIDATURES_GET_ATTENTE, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error('Failed to fetch application');
    }

    return res.json();
}

async function fetchCandidaturesAccepte() {
    const res = await fetch(URL.CANDIDATURES_GET_ACCEPTE, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error('Failed to fetch application');
    }

    return res.json();
}

export default async function candidatures() {
  const candidatures = await fetchCandidatures();
  const candidaturesEnAttente = await fetchCandidaturesEnAttente();
  const candidaturesAcceptees = await fetchCandidaturesAccepte();

  const getDifferenceJours = (date) => {
      const aujourdhui = new Date();
      const lastUpdate = new Date(date);
      const diffTemps = Math.abs(aujourdhui - lastUpdate);
      return Math.ceil(diffTemps / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-slate-800">
    <div className="max-w-7xl mx-auto space-y-12">

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Tableau de bord
          </h1>
          <p className="text-slate-500 mt-1">Suivi de tes candidatures en temps réel</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-slate-600">
            Total : <span className="text-indigo-600 font-bold">{candidatures.length}</span> dossiers
        </div>
      </header>

      {/* --- SECTION 1 : À RELANCER (Urgence) --- */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-red-100 text-red-600 p-2 rounded-full text-xl">🔥</span>
          <h2 className="text-xl font-bold text-slate-800">À relancer (Dossiers {">"} 7 jours)</h2>
        </div>

        {/* Grille des relances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidaturesEnAttente.filter(c => getDifferenceJours(c.updatedAt) > 7).length > 0 ? (
            candidaturesEnAttente
              .filter(c => getDifferenceJours(c.updatedAt) > 7)
              .map((candidature) => (
                <div key={candidature._id} className="relative bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500 hover:shadow-md transition-all duration-200 group">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-bold text-lg text-slate-800 group-hover:text-red-600 transition-colors">
                      {candidature.entreprise}
                    </h5>
                    <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">
                      +{getDifferenceJours(candidature.updatedAt)} jours
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">
                    Ce dossier n'a pas bougé depuis plus d'une semaine. Il est temps d'envoyer un mail !
                  </p>
                  <a href={candidature.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-800">
                    Voir l'annonce &rarr;
                  </a>
                </div>
              ))
          ) : (
            <div className="col-span-full bg-green-50 border border-green-100 rounded-lg p-8 text-center">
              <p className="text-green-700 font-medium">✨ Tout est à jour ! Aucune relance nécessaire pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- SECTION 2 : TOUTES LES CANDIDATURES --- */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Historique complet</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {candidatures.map((candidature) => (
            <div key={candidature._id || uuidv4()} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
              
              {/* Haut de la carte */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  {/* Badge de statut avec couleur dynamique */}
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full 
                    ${candidature.statut === 'Accepté' ? 'bg-green-100 text-green-700' : 
                      candidature.statut === 'Refusée' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'}`}>
                    {candidature.statut}
                  </span>
                </div>

                <h5 className="font-bold text-lg text-slate-900 leading-tight mb-1">
                  {candidature.entreprise}
                </h5>
                <p className="text-sm text-slate-500 font-medium mb-4">
                  {candidature.poste || 'Poste non renseigné'}
                </p>
              </div>

              {/* Bas de la carte */}
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-xs text-slate-400">
                    {/* Tu peux afficher la date ici si tu veux */}
                 </span>
                 <a href={candidature.lien} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
                    Détails
                 </a>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  </div>
  )
}
