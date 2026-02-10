import React from 'react';
import Link from 'next/link';

export default function Container() {
  return (
    <>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid justify-content-center'>
          <Link className='navbar-brand mx-4' href="/">Accueil</Link>
          <Link className='navbar-brand mx-4' href="/candidature">Ajouter une candidature</Link>
          <Link className='navbar-brand mx-4' href="/candidatures">Liste des candidatures</Link>
        </div>
      </nav>
    </>
  );
}
