// pages/_app.js (ou _app.tsx pour TypeScript)
import React from 'react';
import '../app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import RootLayout from '../client/app/layout'; // Assurez-vous de fournir le bon chemin vers votre RootLayout

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
    return (
        <html lang="fr">
        <body className={inter.className}>
        <ThemeProvider enableSystem={true} attribute="class">
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </ThemeProvider>
        </body>
        </html>
    );
}

export default MyApp;
