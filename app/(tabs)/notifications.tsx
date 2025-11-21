import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Notification {
  id: number;
  type: 'promo' | 'new_dish' | 'info';
  title: string;
  description: string;
  restaurantName: string;
  time: string;
  image?: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'promo',
      title: '¡50% de descuento en tu segundo plato!',
      description: 'Aprovecha esta oferta especial en todos los platos de fondo. Válido solo por hoy.',
      restaurantName: 'El Paisa Norteño',
      time: 'Hace 2 horas',
      image: 'https://comidasperuanas.net/wp-content/uploads/2024/04/Receta-de-Ceviche-de-Toyo.jpg',
      read: false,
    },
    {
      id: 2,
      type: 'new_dish',
      title: '¡Nuevo plato disponible!',
      description: 'Hemos agregado "Arroz con Pato" a nuestro menú. ¡Ven a probarlo!',
      restaurantName: 'Sabor Criollo',
      time: 'Hace 5 horas',
      image: 'https://www.comida-peruana.com/base/stock/Recipe/20-image/20-image_web.jpg',
      read: false,
    },
    {
      id: 3,
      type: 'promo',
      title: '2x1 en Chilcanos',
      description: 'Celebra el fin de semana con nuestra promoción de 2x1 en todos los chilcanos clásicos.',
      restaurantName: 'Bar La Esquina',
      time: 'Ayer',
      read: true,
    },
    {
      id: 4,
      type: 'new_dish',
      title: 'Lomo Saltado a lo pobre',
      description: 'Tu favorito de siempre ahora con huevo y plátano frito. ¡Una delicia!',
      restaurantName: 'El Paisa Norteño',
      time: 'Ayer',
      image: 'https://cdn0.recetasgratis.net/es/img/2/3/5/lomo_saltado_peruano_4532_600.jpg',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'Horario extendido',
      description: 'Ahora atendemos hasta las 11:00 PM los viernes y sábados.',
      restaurantName: 'Pizzería Roma',
      time: 'Hace 2 días',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return '🏷️';
      case 'new_dish': return '🍽️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Notificaciones</ThemedText>
        <ThemedText style={styles.subtitle}>Tus alertas recientes</ThemedText>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.notificationCard, 
              { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                opacity: item.read ? 0.8 : 1 
              }
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.restaurantInfo}>
                <Text style={styles.icon}>{getIcon(item.type)}</Text>
                <ThemedText style={styles.restaurantName}>{item.restaurantName}</ThemedText>
              </View>
              <ThemedText style={styles.time}>{item.time}</ThemedText>
            </View>

            <View style={styles.contentContainer}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <View style={styles.textContainer}>
                <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
              </View>
            </View>
            
            {!item.read && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  time: {
    fontSize: 12,
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
