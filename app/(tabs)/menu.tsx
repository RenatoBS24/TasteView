import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuItems = [
    { id: 1, name: 'Ceviche de Tollo', price: 'S/. 35.00', category: 'Platos de Fondo', emoji: '🥩', image: 'https://comidasperuanas.net/wp-content/uploads/2024/04/Receta-de-Ceviche-de-Toyo.jpg' },
    { id: 2, name: 'Ceviche mixto', price: 'S/. 48.00', category: 'Platos de fondo', emoji: '🐟',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdfxQIB0koDq5mrLiOq_q9-pAq44uvawzfg&s' },
    { id: 3, name: 'Tortita de choclo', price: 'S/. 12.00', category: 'Entradas', emoji: '🍗', image:'https://img-global.cpcdn.com/recipes/0b417a5bb2eb4b44/1200x630cq80/photo.jpg' },
    { id: 4, name: 'Papa rellena', price: 'S/. 18.00', category: 'Entradas', emoji: '🥔' ,image:'https://i.pinimg.com/736x/23/e1/59/23e1592c93916fcf15111edafe4b27a4.jpg'},
    { id: 5, name: 'Plato 5', price: 'S/. 25.00', category: 'Parrillas', emoji: '🍢',Image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcomidasperuanas.net%2Fceviche-de-toyo%2F&psig=AOvVaw3-70YOkirbNd412brx3XPg&ust=1759541689917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiQpd7xhpADFQAAAAAdAAAAABAE' },
    { id: 6, name: 'Plato 6', price: 'S/. 38.00', category: 'Platos de Fondo', emoji: '🦐',Image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcomidasperuanas.net%2Fceviche-de-toyo%2F&psig=AOvVaw3-70YOkirbNd412brx3XPg&ust=1759541689917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiQpd7xhpADFQAAAAAdAAAAABAE' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>El paisa norteño</ThemedText>
        <ThemedText style={styles.subtitle}>Menu 3D</ThemedText>
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
        <ThemedText style={styles.dishName}>Ceviche</ThemedText>
        <ThemedText style={styles.dishPrice}>S/. 35.00</ThemedText>
        <ThemedText style={styles.dishDescription}>
          Ceviche de tollo
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
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
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
  menuItemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15
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
