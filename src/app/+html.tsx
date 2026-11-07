// [WEB] Plantilla HTML raíz de la versión web. Solo se usa en el navegador (no afecta Android/iOS).
// Aquí van las meta etiquetas, el color de fondo y la vista previa al compartir el link.
import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const estilosGlobales = `
html, body { background-color: #F2FAF5; }
body { -webkit-font-smoothing: antialiased; }
/* Sin el contorno cuadrado del navegador al escribir; los campos ya tienen borde propio. */
input:focus, textarea:focus { outline: none; }
/* Pero sí un anillo visible al navegar con teclado (Tab), por accesibilidad. */
[role="button"]:focus-visible, [role="tab"]:focus-visible, [role="link"]:focus-visible, a:focus-visible {
  outline: 2px solid #349A64; outline-offset: 2px;
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Rumbo · Tutor con IA</title>
        <meta name="description" content="Tutor con IA generativa que te explica lo difícil a tu medida y avanza contigo en tu ciclo." />
        <meta name="theme-color" content="#F2FAF5" />
        <meta property="og:title" content="Rumbo · Tutor con IA" />
        <meta property="og:description" content="Cada ciclo, un paso más cerca de tu meta." />
        <meta property="og:type" content="website" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: estilosGlobales }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
