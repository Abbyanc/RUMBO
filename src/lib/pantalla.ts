// [WEB] Utilidades para que la app se vea bien en pantallas grandes (laptop / PC).
import { Alert, Platform, useWindowDimensions, type ViewStyle } from 'react-native';

export const esWeb = Platform.OS === 'web';

/** A partir de este ancho (px) se usa el diseño de escritorio: barra lateral y 2 columnas. */
export const PUNTO_ESCRITORIO = 900;

/** Anchos máximos del contenido para que no se estire en pantallas grandes. */
export const ANCHO = {
  formulario: 520, // login, registro y check-in
  chat: 760, // tutor y agenda
  app: 1080, // inicio y progreso (2 columnas)
} as const;

/** true cuando la ventana es lo bastante ancha para el diseño de escritorio. */
export function useEscritorio() {
  const { width } = useWindowDimensions();
  return width >= PUNTO_ESCRITORIO;
}

/** Centra un bloque y limita su ancho. En el celular no cambia nada (la pantalla es más angosta). */
export function centrado(max: number): ViewStyle {
  return { width: '100%', maxWidth: max, alignSelf: 'center' };
}

/** Alert.alert no hace nada en la web; aquí usamos el aviso del navegador. */
export function avisar(titulo: string, mensaje: string) {
  if (esWeb) globalThis.alert?.(`${titulo}\n\n${mensaje}`);
  else Alert.alert(titulo, mensaje);
}
