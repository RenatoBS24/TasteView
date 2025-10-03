import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuItems = [
    { id: 1, name: 'Plato 1', price: 'S/. 35.00', category: 'Platos de Fondo', emoji: '🥩' },
    { id: 2, name: 'Plato 2', price: 'S/. 28.00', category: 'Entradas', emoji: '🐟' },
    { id: 3, name: 'Plato 3', price: 'S/. 32.00', category: 'Platos de Fondo', emoji: '🍗' },
    { id: 4, name: 'Plato 4', price: 'S/. 18.00', category: 'Entradas', emoji: '🥔' },
    { id: 5, name: 'Plato 5', price: 'S/. 25.00', category: 'Parrillas', emoji: '🍢' },
    { id: 6, name: 'Plato 6', price: 'S/. 38.00', category: 'Platos de Fondo', emoji: '🦐' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Menú 3D</ThemedText>
        <ThemedText style={styles.subtitle}>Restaurante El Sabor</ThemedText>
      </View>

      <View style={styles.viewerSection}>
        <View style={[styles.viewer3D, { backgroundColor: colors.border }]}>
          <Text style={styles.viewer3DIcon}>🍽️</Text>
          <ThemedText style={styles.viewer3DText}>Vista 3D del Plato</ThemedText>
          <View style={styles.controlsHint}>
            <Text style={[styles.controlIcon, { color: colors.icon }]}>↻</Text>
            <ThemedText style={styles.controlText}>Desliza para rotar</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <ThemedText style={styles.dishName}>Cevichazo xd</ThemedText>
        <ThemedText style={styles.dishPrice}>S/. 35.00</ThemedText>
        <ThemedText style={styles.dishDescription}>
          Plato 1 
        </ThemedText>
      </View>

      <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Otros Platos</ThemedText>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemEmoji}>{item.emoji}</Text>
            <View style={styles.menuItemInfo}>
              <ThemedText style={styles.menuItemName}>{item.name}</ThemedText>
              <ThemedText style={styles.menuItemCategory}>{item.category}</ThemedText>
            </View>
            <ThemedText style={styles.menuItemPrice}>{item.price}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  viewerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewer3D: {
    height: 250,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewer3DIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  viewer3DText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  controlsHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlIcon: {
    fontSize: 24,
  },
  controlText: {
    fontSize: 12,
    opacity: 0.6,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.8,
    marginBottom: 12,
  },
  dishDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  menuItemEmoji: {
    fontSize: 36,
    marginRight: 15,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemCategory: {
    fontSize: 12,
    opacity: 0.6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});
