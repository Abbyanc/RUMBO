// [WEB] Título de la pestaña del navegador ("Tutor · Rumbo"). En el celular no muestra nada.
import Head from 'expo-router/head';

export function TituloPagina({ titulo }: { titulo: string }) {
  return (
    <Head>
      <title>{`${titulo} · Rumbo`}</title>
    </Head>
  );
}
