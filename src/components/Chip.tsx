import { Pressable, StyleSheet, Text } from 'react-native';
import { color, fuente, primitivos, radio } from '../theme';

export function Chip({ etiqueta, activo, onPress }: { etiqueta: string; activo?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: activo }}
      onPress={onPress}
      style={(estado) => {
        // [WEB] Hover: fondo menta suave al pasar el mouse.
        const { hovered } = estado as { pressed: boolean; hovered?: boolean };
        return [s.chip, hovered && !activo && s.hover, activo && s.activo];
      }}
    >
      <Text style={[s.texto, activo && { color: color.texto.invertido }]}>{etiqueta}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: radio.full,
    borderWidth: 1,
    borderColor: color.borde.acento,
    backgroundColor: color.fondo.superficie,
    justifyContent: 'center',
  },
  hover: { backgroundColor: primitivos.verde100 },
  activo: { backgroundColor: color.accion.primaria, borderColor: color.accion.primaria },
  texto: { fontFamily: fuente.cuerpoFuerte, fontSize: 13, color: color.texto.acento },
});
