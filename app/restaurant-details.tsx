import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');

export default function RestaurantDetailsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuCategories = [
    {
      id: 1,
      name: 'Entradas',
      items: [
        { id: 1, name: 'Ceviche Clásico', price: 'S/. 28.00', emoji: '🐟', has3D: true },
        { id: 2, name: 'Causa Limeña', price: 'S/. 18.00', emoji: '🥔', has3D: true },
        { id: 3, name: 'Anticuchos', price: 'S/. 25.00', emoji: '🍢', has3D: true },
      ],
    },
    {
      id: 2,
      name: 'Platos de Fondo',
      items: [
        { id: 4, name: 'Lomo Saltado', price: 'S/. 35.00', emoji: '🥩', has3D: true },
        { id: 5, name: 'Ají de Gallina', price: 'S/. 32.00', emoji: '🍗', has3D: true },
        { id: 6, name: 'Arroz con Mariscos', price: 'S/. 38.00', emoji: '🦐', has3D: false },
      ],
    },
    {
      id: 3,
      name: 'Postres',
      items: [
        { id: 7, name: 'Suspiro Limeño', price: 'S/. 15.00', emoji: '🍮', has3D: true },
        { id: 8, name: 'Mazamorra Morada', price: 'S/. 12.00', emoji: '🍇', has3D: false },
      ],
    },
  ];

  const reviews = [
    { id: 1, user: 'María G.', rating: 5, comment: 'Excelente comida, el modelo 3D ayudó mucho!' },
    { id: 2, user: 'Carlos R.', rating: 5, comment: 'Innovador! Me encanta ver los platos antes de ordenar.' },
    { id: 3, user: 'Ana S.', rating: 4, comment: 'Muy buena experiencia, recomendado.' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={[styles.heroSection, { backgroundColor: colors.border }]}>
          <Text style={styles.heroEmoji}>🇵🇪</Text>
          <View style={[styles.badge3D, { backgroundColor: colors.primary }]}>
            <Text style={styles.badge3DText}>Menú 3D</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <ThemedText style={styles.restaurantName}>El Sabor Peruano</ThemedText>
              <ThemedText style={styles.cuisine}>Cocina Peruana</ThemedText>
            </View>
            <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
              <Text style={styles.favoriteIcon}>🤍</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>
              <ThemedText style={styles.statText}>4.8 (234)</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📍</Text>
              <ThemedText style={styles.statText}>1.2 km</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🕐</Text>
              <ThemedText style={styles.statText}>30-40 min</ThemedText>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoTitle}>Sobre este restaurante</ThemedText>
              <ThemedText style={styles.infoText}>
                Restaurante especializado en comida peruana tradicional con más de 15 años de experiencia. 
                Todos nuestros platos principales están disponibles en visualización 3D.
              </ThemedText>
            </View>
          </View>

          <View style={[styles.scheduleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.scheduleIcon}>🕐</Text>
            <View style={styles.scheduleContent}>
              <ThemedText style={styles.scheduleTitle}>Horario de atención</ThemedText>
              <ThemedText style={styles.scheduleText}>Lun - Dom: 11:00 AM - 10:00 PM</ThemedText>
              <View style={[styles.openBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.openBadgeText}>Abierto ahora</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <ThemedText style={styles.sectionTitle}>Menú</ThemedText>
          
          {menuCategories.map((category) => (
            <View key={category.id} style={styles.categorySection}>
              <ThemedText style={styles.categoryTitle}>{category.name}</ThemedText>
              
              {category.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuItemImage, { backgroundColor: colors.border }]}>
                    <Text style={styles.menuItemEmoji}>{item.emoji}</Text>
                    {item.has3D && (
                      <View style={styles.badge3DSmall}>
                        <Text style={styles.badge3DSmallText}>3D</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.menuItemInfo}>
                    <ThemedText style={styles.menuItemName}>{item.name}</ThemedText>
                    <ThemedText style={styles.menuItemPrice}>{item.price}</ThemedText>
                  </View>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <ThemedText style={styles.sectionTitle}>Opiniones</ThemedText>
            <TouchableOpacity activeOpacity={0.7}>
              <ThemedText style={[styles.seeAllLink, { color: colors.primary }]}>
                Ver todas
              </ThemedText>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View
              key={review.id}
              style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.reviewHeader}>
                <View style={[styles.reviewAvatar, { backgroundColor: colors.border }]}>
                  <Text style={styles.reviewAvatarText}>
                    {review.user.charAt(0)}
                  </Text>
                </View>
                <View style={styles.reviewUserInfo}>
                  <ThemedText style={styles.reviewUser}>{review.user}</ThemedText>
                  <View style={styles.reviewRating}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Text key={i} style={styles.starIcon}>⭐</Text>
                    ))}
                  </View>
                </View>
              </View>
              <ThemedText style={styles.reviewComment}>{review.comment}</ThemedText>
            </View>
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationSection}>
          <ThemedText style={styles.sectionTitle}>Ubicación</ThemedText>
          <View style={[styles.mapPlaceholder, { backgroundColor: colors.border }]}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <ThemedText style={styles.mapText}>Av. Principal 123, Lima</ThemedText>
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
  heroSection: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 100,
  },
  badge3D: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  badge3DText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    opacity: 0.6,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 28,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 16,
  },
  statText: {
    fontSize: 14,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  scheduleCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  scheduleIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  scheduleText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  openBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  openBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  menuSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  menuItemEmoji: {
    fontSize: 32,
  },
  badge3DSmall: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#6B7280',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badge3DSmallText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuItemArrow: {
    fontSize: 24,
    opacity: 0.4,
  },
  reviewsSection: {
    padding: 20,
    paddingTop: 0,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  starIcon: {
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  locationSection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  mapPlaceholder: {
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
