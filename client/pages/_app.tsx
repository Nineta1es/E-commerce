// _app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import Navbar from '@/src/components/navbar'; // Assurez-vous de mettre le bon chemin vers votre composant de navbar

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
