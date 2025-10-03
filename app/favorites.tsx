import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const favorites = [
    {
      id: 1,
      name: 'Lomo Saltado',
      restaurant: 'El Sabor Peruano',
      price: 'S/. 35.00',
      category: 'Platos de Fondo',
      emoji: '🥩',
      rating: '4.8',
    },
    {
      id: 2,
      name: 'Ceviche Clásico',
      restaurant: 'Marisquería La Costa',
      price: 'S/. 28.00',
      category: 'Entradas',
      emoji: '🐟',
      rating: '4.9',
    },
    {
      id: 3,
      name: 'Pizza Margherita',
      restaurant: 'Pizzería Napoli',
      price: 'S/. 32.00',
      category: 'Pizzas',
      emoji: '🍕',
      rating: '4.7',
    },
    {
      id: 4,
      name: 'Sushi Roll',
      restaurant: 'Sushi Master',
      price: 'S/. 45.00',
      category: 'Japonesa',
      emoji: '🍣',
      rating: '4.9',
    },
    {
      id: 5,
      name: 'Causa Limeña',
      restaurant: 'El Sabor Peruano',
      price: 'S/. 18.00',
      category: 'Entradas',
      emoji: '🥔',
      rating: '4.6',
    },
    {
      id: 6,
      name: 'Ensalada César',
      restaurant: 'Veggie Delight',
      price: 'S/. 22.00',
      category: 'Ensaladas',
      emoji: '🥗',
      rating: '4.5',
    },
  ];

  const categories = ['Todos', 'Platos de Fondo', 'Entradas', 'Pizzas', 'Japonesa'];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Favoritos</ThemedText>
        <ThemedText style={styles.subtitle}>
          {favorites.length} platos guardados
        </ThemedText>
      </View>

      <View style={styles.filterSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filters}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterChipText,
                selectedCategory === category
                  ? { color: '#FFFFFF', fontWeight: '600' }
                  : { color: colors.text }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.favoritesList} showsVerticalScrollIndicator={false}>
        {favorites.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.favoriteCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={[styles.dishImage, { backgroundColor: colors.border }]}>
              <Text style={styles.dishEmoji}>{item.emoji}</Text>
              <View style={styles.badge3D}>
                <Text style={styles.badge3DText}>3D</Text>
              </View>
            </View>

            <View style={styles.dishInfo}>
              <View style={styles.dishHeader}>
                <ThemedText style={styles.dishName}>{item.name}</ThemedText>
                <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantIcon}>🏪</Text>
                <ThemedText style={styles.restaurantName}>
                  {item.restaurant}
                </ThemedText>
              </View>

              <View style={styles.dishMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⭐</Text>
                  <ThemedText style={styles.metaText}>{item.rating}</ThemedText>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🏷️</Text>
                  <ThemedText style={styles.metaText}>{item.category}</ThemedText>
                </View>
              </View>

              <View style={styles.dishFooter}>
                <ThemedText style={styles.dishPrice}>{item.price}</ThemedText>
                <TouchableOpacity
                  style={[styles.viewButton, { backgroundColor: colors.primary }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.viewButtonText}>Ver en 3D</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {favorites.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💔</Text>
          <ThemedText style={styles.emptyTitle}>Sin favoritos aún</ThemedText>
          <ThemedText style={styles.emptyText}>
            Explora restaurantes y guarda tus platos favoritos
          </ThemedText>
          <TouchableOpacity
            style={[styles.exploreButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
          >
            <Text style={styles.exploreButtonText}>Explorar Restaurantes</Text>
          </TouchableOpacity>
        </View>
      )}
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
  filterSection: {
    marginBottom: 20,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
  },
  favoritesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  favoriteCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
  dishImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  dishEmoji: {
    fontSize: 80,
  },
  badge3D: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#6B7280',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badge3DText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dishInfo: {
    gap: 12,
  },
  dishHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  restaurantIcon: {
    fontSize: 16,
  },
  restaurantName: {
    fontSize: 14,
    opacity: 0.7,
  },
  dishMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 14,
    opacity: 0.7,
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  dishFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
