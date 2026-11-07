import { Tabs } from 'expo-router';
import { CalendarDays, ChartLine, House, MessageCircle, type LucideIcon } from 'lucide-react-native';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoHorizontal } from '../../components/Logo';
import { useEscritorio } from '../../lib/pantalla';
import { color, fuente, primitivos, radio } from '../../theme';

const ICONOS: Record<string, { Icono: LucideIcon; etiqueta: string }> = {
  inicio: { Icono: House, etiqueta: 'Inicio' },
  agenda: { Icono: CalendarDays, etiqueta: 'Agenda' },
  tutor: { Icono: MessageCircle, etiqueta: 'Tutor' },
  progreso: { Icono: ChartLine, etiqueta: 'Progreso' },
};

type PropsBarra = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/** Navegación inferior del diseño (celular): ícono en píldora menta cuando está activo. */
function Navegacion({ state, navigateToTab }: PropsBarra) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[s.barra, { paddingBottom: Math.max(bottom, 10) }]}>
      {state.routes.map((ruta, i) => {
        const item = ICONOS[ruta.name];
        if (!item) return null;
        const activo = state.index === i;
        const { Icono } = item;
        return (
          <Pressable
            key={ruta.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: activo }}
            accessibilityLabel={item.etiqueta}
            onPress={() => {
              if (!activo) navigateToTab(ruta.key);
            }}
            style={s.item}
          >
            <View style={[s.pildora, activo && s.pildoraActiva]}>
              <Icono size={22} color={activo ? color.texto.acento : color.texto.secundario} />
            </View>
            <Text style={[s.etiqueta, activo && s.etiquetaActiva]}>{item.etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** [WEB] Barra lateral para pantallas anchas: logo arriba y las 4 secciones en filas. */
function BarraLateral({ state, navigateToTab }: PropsBarra) {
  return (
    <View style={s.lateral} accessibilityRole="tablist">
      <View style={s.lateralLogo}>
        <LogoHorizontal height={30} />
      </View>
      {state.routes.map((ruta, i) => {
        const item = ICONOS[ruta.name];
        if (!item) return null;
        const activo = state.index === i;
        const { Icono } = item;
        return (
          <Pressable
            key={ruta.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: activo }}
            accessibilityLabel={item.etiqueta}
            onPress={() => {
              if (!activo) navigateToTab(ruta.key);
            }}
            style={(estado) => {
              const { hovered } = estado as { pressed: boolean; hovered?: boolean };
              return [s.lateralItem, hovered && !activo && s.lateralItemHover, activo && s.lateralItemActivo];
            }}
          >
            <Icono size={20} color={activo ? color.texto.acento : color.texto.secundario} />
            <Text style={[s.lateralEtiqueta, activo && s.etiquetaActiva]}>{item.etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const escritorio = useEscritorio();
  return (
    <Tabs
      // [WEB] En pantallas anchas la navegación pasa a la izquierda.
      screenOptions={{ headerShown: false, tabBarPosition: escritorio ? 'left' : 'bottom' }}
      tabBar={(props) => (escritorio ? <BarraLateral {...props} /> : <Navegacion {...props} />)}
    >
      <Tabs.Screen name="inicio" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="agenda" options={{ title: 'Agenda' }} />
      <Tabs.Screen name="tutor" options={{ title: 'Tutor' }} />
      <Tabs.Screen name="progreso" options={{ title: 'Progreso' }} />
    </Tabs>
  );
}

const s = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    backgroundColor: color.fondo.superficie,
    borderTopWidth: 1,
    borderTopColor: color.borde.sutil,
  },
  item: { minWidth: 64, minHeight: 48, alignItems: 'center', gap: 4 },
  pildora: { width: 54, height: 28, borderRadius: radio.full, alignItems: 'center', justifyContent: 'center' },
  pildoraActiva: { backgroundColor: color.accion.suave },
  etiqueta: { fontFamily: fuente.cuerpo, fontSize: 12, color: color.texto.secundario },
  etiquetaActiva: { fontFamily: fuente.cuerpoFuerte, color: color.texto.acento },

  // [WEB] Barra lateral
  lateral: {
    width: 232,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 6,
    backgroundColor: color.fondo.superficie,
    borderRightWidth: 1,
    borderRightColor: color.borde.sutil,
  },
  lateralLogo: { paddingHorizontal: 8, paddingBottom: 24 },
  lateralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: radio.full,
  },
  lateralItemHover: { backgroundColor: primitivos.verde50 },
  lateralItemActivo: { backgroundColor: color.accion.suave },
  lateralEtiqueta: { fontFamily: fuente.cuerpoMedio, fontSize: 15, color: color.texto.secundario },
});
