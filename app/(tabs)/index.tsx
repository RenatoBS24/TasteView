import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>TasteView</ThemedText>
        <ThemedText style={styles.subtitle}>Explora menús en 3D</ThemedText>
      </View>

      <View style={styles.heroSection}>
        <View style={[styles.heroImage, { backgroundColor: colors.border }]}>
          <Text style={[styles.heroIcon, { color: colors.icon }]}>🍽️</Text>
        </View>
        <ThemedText style={styles.heroText}>
          Visualiza platos de restaurantes en 3D
        </ThemedText>
        <ThemedText style={styles.heroSubtext}>
          Descubre el menú de forma interactiva antes de ordenar
        </ThemedText>
      </View>

      <View style={styles.features}>
        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.featureIcon}>📱</Text>
          <ThemedText style={styles.featureTitle}>Visualización 3D</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Rota y explora cada plato en detalle
          </ThemedText>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.featureIcon}>🏪</Text>
          <ThemedText style={styles.featureTitle}>Múltiples Restaurantes</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Accede a menús de diferentes lugares
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.ctaButton, { backgroundColor: colors.primary }]}
        activeOpacity={0.7}
      >
        <Text style={styles.ctaText}>Explorar Restaurantes</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIcon: {
    fontSize: 80,
  },
  heroText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  featureCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  ctaButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
