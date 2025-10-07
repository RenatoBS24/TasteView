import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function RestaurantDetailsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuCategories = [
    {
      id: 1,
      name: 'Hamburguesas',
      items: [
        { id: 1, name: 'Hamburguesa de carne', price: 'S/. 10.00', emoji: '🐟', has3D: true,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YDCJqgMFtsD9dBn2uch0RTrROXHmvr1vnw&s' },
        { id: 2, name: 'Hamburguesa de pollo', price: 'S/. 10.00', emoji: '🥔', has3D: true,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKW-gqesppw_f22pEzRuxscyzZWOTA3YJLMg&s' },
        { id: 3, name: 'Hamburguesa a lo pobre', price: 'S/. 18.00', emoji: '🍢', has3D: true, image:'https://www.bembos.com.pe/media/catalog/product/2/1/2146463857.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg' },
      ],
    }
  ];

  const reviews = [
    { id: 1, user: 'María G.', rating: 5, comment: 'Excelente comida, el modelo 3D ayudó mucho!' },
    { id: 2, user: 'Carlos R.', rating: 5, comment: 'Innovador! Me encanta ver los platos antes de ordenar.' },
    { id: 3, user: 'Ana S.', rating: 4, comment: 'Muy buena experiencia, recomendado.' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, { backgroundColor: colors.border }]}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR1dubu5XkFUU25TNmn9Er85UgCvWEc4IGw&s' }} style={styles.heroImage}
            resizeMode="cover" />
          <View style={[styles.badge3D, { backgroundColor: colors.primary }]}>
            <Text style={styles.badge3DText}>Menú 3D</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <ThemedText style={styles.restaurantName}>Noly</ThemedText>
              <ThemedText style={styles.cuisine}>Sandwicheria</ThemedText>
            </View>
            <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
              <Text style={styles.favoriteIcon}>🤍</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>
              <ThemedText style={styles.statText}>4.6 (234)</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📍</Text>
              <ThemedText style={styles.statText}>2.5 km</ThemedText>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoTitle}>Sobre este restaurante</ThemedText>
              <ThemedText style={styles.infoText}>
                Restaurante especializado en comida rapida, con más de 15 años de experiencia.
              </ThemedText>
            </View>
          </View>

          <View style={[styles.scheduleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.scheduleIcon}>🕐</Text>
            <View style={styles.scheduleContent}>
              <ThemedText style={styles.scheduleTitle}>Horario de atención</ThemedText>
              <ThemedText style={styles.scheduleText}>Lun - Dom: 6:00 PM - 12:00 PM</ThemedText>
              <View style={[styles.openBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.openBadgeText}>Abierto ahora</Text>
              </View>
            </View>
          </View>
        </View>
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
                    <Image source={{ uri: item.image }} style={styles. menuItemImageInner} />
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
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <ThemedText style={styles.sectionTitle}>Opiniones</ThemedText>
            <TouchableOpacity activeOpacity={0.7}>
              <ThemedText style={[styles.seeAllLink, { color: colors.primary }]}>
                Ver todas
              </ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addReviewButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/add-review')}
            activeOpacity={0.7}
          >
            <Text style={styles.addReviewIcon}>✍️</Text>
            <Text style={styles.addReviewText}>Agregar mi reseña</Text>
          </TouchableOpacity>

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
        <View style={styles.locationSection}>
          <ThemedText style={styles.sectionTitle}>Ubicación</ThemedText>
          <View style={[styles.mapPlaceholder, { backgroundColor: colors.border }]}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <ThemedText style={styles.mapText}>Av. grau 433, Lambayeque</ThemedText>
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
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
   menuItemImageInner: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    
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
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  addReviewIcon: {
    fontSize: 20,
  },
  addReviewText: {
    color: '#FFFFFF',
    fontSize: 15,
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
  reviewsActions: {
    flexDirection: 'row',
    gap: 12,
    },
});
