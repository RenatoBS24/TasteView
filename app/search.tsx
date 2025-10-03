import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    '🥩 Lomo Saltado',
    '🐟 Ceviche',
    '🍕 Pizza',
    '🍣 Sushi',
    '🍗 Pollo a la brasa',
    '🥗 Ensaladas',
  ];

  const recentSearches = [
    { id: 1, text: 'Ceviche', icon: '🕐' },
    { id: 2, text: 'Lomo Saltado', icon: '🕐' },
    { id: 3, text: 'Pizza Margherita', icon: '🕐' },
  ];

  const trendingDishes = [
    {
      id: 1,
      name: 'Lomo Saltado',
      restaurant: 'El Sabor Peruano',
      emoji: '🥩',
      searches: '2.3k búsquedas',
      has3D: true,
    },
    {
      id: 2,
      name: 'Ceviche Mixto',
      restaurant: 'Marisquería La Costa',
      emoji: '🐟',
      searches: '1.8k búsquedas',
      has3D: true,
    },
    {
      id: 3,
      name: 'Sushi Roll Premium',
      restaurant: 'Sushi Master',
      emoji: '🍣',
      searches: '1.5k búsquedas',
      has3D: true,
    },
    {
      id: 4,
      name: 'Pizza Napolitana',
      restaurant: 'Pizzería Napoli',
      emoji: '🍕',
      searches: '1.2k búsquedas',
      has3D: true,
    },
  ];

  const categories = [
    { id: 1, name: 'Peruana', emoji: '🇵🇪', count: 45 },
    { id: 2, name: 'Italiana', emoji: '🇮🇹', count: 32 },
    { id: 3, name: 'Japonesa', emoji: '🇯🇵', count: 28 },
    { id: 4, name: 'Mexicana', emoji: '🇲🇽', count: 24 },
    { id: 5, name: 'China', emoji: '🇨🇳', count: 20 },
    { id: 6, name: 'Vegetariana', emoji: '🥗', count: 18 },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Buscar</ThemedText>
      </View>

      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar platos o restaurantes..."
            placeholderTextColor={colors.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Búsquedas recientes</ThemedText>
              <TouchableOpacity activeOpacity={0.7}>
                <ThemedText style={[styles.clearAllText, { color: colors.primary }]}>
                  Limpiar
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.recentList}>
              {recentSearches.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.recentItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.recentIcon}>{item.icon}</Text>
                  <ThemedText style={styles.recentText}>{item.text}</ThemedText>
                  <TouchableOpacity style={styles.removeButton} activeOpacity={0.7}>
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Popular Searches */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Búsquedas populares</ThemedText>
          <View style={styles.popularGrid}>
            {popularSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.popularChip, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={styles.popularText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Categorías</ThemedText>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                <ThemedText style={styles.categoryCount}>
                  {category.count} platos
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Dishes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Platos en tendencia</ThemedText>
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingIcon}>🔥</Text>
            </View>
          </View>

          {trendingDishes.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={[styles.trendingCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <View style={[styles.dishImage, { backgroundColor: colors.border }]}>
                <Text style={styles.dishEmoji}>{dish.emoji}</Text>
                {dish.has3D && (
                  <View style={styles.badge3D}>
                    <Text style={styles.badge3DText}>3D</Text>
                  </View>
                )}
              </View>
              <View style={styles.dishInfo}>
                <ThemedText style={styles.dishName}>{dish.name}</ThemedText>
                <View style={styles.dishMeta}>
                  <Text style={styles.metaIcon}>🏪</Text>
                  <ThemedText style={styles.restaurantName}>
                    {dish.restaurant}
                  </ThemedText>
                </View>
                <View style={styles.searchesBadge}>
                  <Text style={styles.searchesIcon}>📊</Text>
                  <ThemedText style={styles.searchesText}>{dish.searches}</ThemedText>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View style={[styles.tipsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.tipsIcon}>💡</Text>
          <View style={styles.tipsContent}>
            <ThemedText style={styles.tipsTitle}>Consejo de búsqueda</ThemedText>
            <ThemedText style={styles.tipsText}>
              Usa el filtro 3D para encontrar solo platos con visualización 3D disponible
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  searchBar: {
    flex: 1,
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
  clearIcon: {
    fontSize: 18,
    opacity: 0.5,
    padding: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentList: {
    gap: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  recentIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    fontSize: 16,
    opacity: 0.5,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  popularText: {
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    opacity: 0.6,
  },
  trendingBadge: {
    paddingHorizontal: 8,
  },
  trendingIcon: {
    fontSize: 20,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  dishEmoji: {
    fontSize: 36,
  },
  badge3D: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#6B7280',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badge3DText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dishMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  metaIcon: {
    fontSize: 12,
  },
  restaurantName: {
    fontSize: 13,
    opacity: 0.6,
  },
  searchesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  searchesIcon: {
    fontSize: 12,
  },
  searchesText: {
    fontSize: 12,
    opacity: 0.6,
  },
  chevron: {
    fontSize: 24,
    opacity: 0.4,
  },
  tipsCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    borderWidth: 1,
  },
  tipsIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  tipsText: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
});
