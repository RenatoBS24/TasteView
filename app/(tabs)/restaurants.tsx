import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RestaurantsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const restaurants = [
    {
      id: 1,
      name: 'El Sabor Peruano',
      cuisine: 'Cocina Peruana',
      rating: '4.8',
      distance: '1.2 km',
      emoji: '🇵🇪',
      has3D: true,
    },
    {
      id: 2,
      name: 'Marisquería La Costa',
      cuisine: 'Mariscos',
      rating: '4.6',
      distance: '2.5 km',
      emoji: '🦐',
      has3D: true,
    },
    {
      id: 3,
      name: 'Pizzería Napoli',
      cuisine: 'Italiana',
      rating: '4.7',
      distance: '800 m',
      emoji: '🍕',
      has3D: true,
    },
    {
      id: 4,
      name: 'Sushi Master',
      cuisine: 'Japonesa',
      rating: '4.9',
      distance: '3.1 km',
      emoji: '🍣',
      has3D: true,
    },
    {
      id: 5,
      name: 'La Parrilla',
      cuisine: 'Parrillas',
      rating: '4.5',
      distance: '1.8 km',
      emoji: '🥩',
      has3D: false,
    },
    {
      id: 6,
      name: 'Veggie Delight',
      cuisine: 'Vegetariana',
      rating: '4.4',
      distance: '2.2 km',
      emoji: '🥗',
      has3D: true,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Restaurantes</ThemedText>
        <ThemedText style={styles.subtitle}>Con menús 3D disponibles</ThemedText>
      </View>

      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar restaurantes..."
            placeholderTextColor={colors.secondary}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: colors.primary }]} activeOpacity={0.7}>
            <Text style={styles.filterChipTextActive}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} activeOpacity={0.7}>
            <Text style={[styles.filterChipText, { color: colors.text }]}>Cerca de mí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} activeOpacity={0.7}>
            <Text style={[styles.filterChipText, { color: colors.text }]}>Mejor valorados</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.restaurantList} showsVerticalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={[styles.restaurantCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={[styles.restaurantImage, { backgroundColor: colors.border }]}>
              <Text style={styles.restaurantEmoji}>{restaurant.emoji}</Text>
              {restaurant.has3D && (
                <View style={[styles.badge3D, { backgroundColor: colors.primary }]}>
                  <Text style={styles.badge3DText}>3D</Text>
                </View>
              )}
            </View>
            <View style={styles.restaurantInfo}>
              <ThemedText style={styles.restaurantName}>{restaurant.name}</ThemedText>
              <ThemedText style={styles.restaurantCuisine}>{restaurant.cuisine}</ThemedText>
              <View style={styles.restaurantMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⭐</Text>
                  <ThemedText style={styles.metaText}>{restaurant.rating}</ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>📍</Text>
                  <ThemedText style={styles.metaText}>{restaurant.distance}</ThemedText>
                </View>
              </View>
            </View>
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
  filterChipTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  restaurantList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  restaurantEmoji: {
    fontSize: 48,
  },
  badge3D: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badge3DText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 10,
  },
  restaurantMeta: {
    flexDirection: 'row',
    gap: 15,
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
});
