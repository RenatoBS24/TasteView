import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RestaurantRegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    cuisine: '',
    description: '',
    openTime: '',
    closeTime: '',
    has3DMenu: true,
  });

  const cuisineTypes = [
    'Peruana', 'Italiana', 'Japonesa', 'Mexicana', 'China', 
    'Vegetariana', 'Mariscos', 'Parrillas', 'Fast Food', 'Otra'
  ];

  const [selectedCuisine, setSelectedCuisine] = useState('');

  const handleRegister = () => {
    console.log('Registro de restaurante:', formData);
    router.push('/restaurant-menu-manager');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={[styles.logoContainer, { backgroundColor: colors.border }]}>
            <Text style={styles.logoIcon}>🏪</Text>
          </View>
          <ThemedText style={styles.title}>Registrar Restaurante</ThemedText>
          <ThemedText style={styles.subtitle}>
            Únete a TasteView y muestra tu menú en 3D
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Información del Restaurante</ThemedText>
            
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>🏪</Text>
              <TextInput
                placeholder="Nombre del restaurante"
                placeholderTextColor={colors.secondary}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                placeholder="Email del restaurante"
                placeholderTextColor={colors.secondary}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>📱</Text>
              <TextInput
                placeholder="Teléfono de contacto"
                placeholderTextColor={colors.secondary}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Tipo de Cocina</ThemedText>
            <View style={styles.cuisineGrid}>
              {cuisineTypes.map((cuisine) => (
                <TouchableOpacity
                  key={cuisine}
                  style={[
                    styles.cuisineChip,
                    { backgroundColor: colors.card, borderColor: colors.border },
                    selectedCuisine === cuisine && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => setSelectedCuisine(cuisine)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.cuisineChipText,
                    { color: colors.text },
                    selectedCuisine === cuisine && { color: '#FFFFFF', fontWeight: '600' }
                  ]}>
                    {cuisine}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Ubicación</ThemedText>
            
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                placeholder="Dirección completa"
                placeholderTextColor={colors.secondary}
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            <TouchableOpacity 
              style={[styles.mapButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={styles.mapIcon}>🗺️</Text>
              <ThemedText style={styles.mapButtonText}>Seleccionar en mapa</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Horario de Atención</ThemedText>
            
            <View style={styles.timeRow}>
              <View style={[styles.timeInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={styles.timeLabel}>Apertura</Text>
                <TextInput
                  placeholder="09:00"
                  placeholderTextColor={colors.secondary}
                  value={formData.openTime}
                  onChangeText={(text) => setFormData({...formData, openTime: text})}
                  style={[styles.timeInput, { color: colors.text }]}
                />
              </View>

              <Text style={styles.timeSeparator}>-</Text>

              <View style={[styles.timeInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={styles.timeLabel}>Cierre</Text>
                <TextInput
                  placeholder="22:00"
                  placeholderTextColor={colors.secondary}
                  value={formData.closeTime}
                  onChangeText={(text) => setFormData({...formData, closeTime: text})}
                  style={[styles.timeInput, { color: colors.text }]}
                />
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Descripción</ThemedText>
            
            <View style={[styles.textAreaContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TextInput
                placeholder="Cuéntanos sobre tu restaurante..."
                placeholderTextColor={colors.secondary}
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={[styles.textArea, { color: colors.text }]}
              />
            </View>
          </View>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Seguridad</ThemedText>
            
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={colors.secondary}
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Confirmar contraseña"
                placeholderTextColor={colors.secondary}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                secureTextEntry
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={[styles.feature3DCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.feature3DContent}>
                <Text style={styles.feature3DIcon}>🧊</Text>
                <View style={styles.feature3DInfo}>
                  <ThemedText style={styles.feature3DTitle}>Menú 3D</ThemedText>
                  <ThemedText style={styles.feature3DText}>
                    Habilitar visualización 3D de tus platos
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={formData.has3DMenu}
                onValueChange={(value) => setFormData({...formData, has3DMenu: value})}
                trackColor={{ false: colors.secondary, true: colors.primary }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
            activeOpacity={0.7}
          >
            <Text style={styles.registerButtonText}>Crear Cuenta de Restaurante</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <ThemedText style={styles.loginLinkText}>¿Ya tienes una cuenta? </ThemedText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <ThemedText style={[styles.loginLink, { color: colors.primary }]}>
                Inicia sesión
              </ThemedText>
            </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    opacity: 0.6,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cuisineChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  cuisineChipText: {
    fontSize: 14,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  mapIcon: {
    fontSize: 20,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeInputContainer: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 6,
  },
  timeInput: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  timeSeparator: {
    fontSize: 24,
    opacity: 0.4,
  },
  textAreaContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    minHeight: 100,
  },
  textArea: {
    fontSize: 16,
    lineHeight: 22,
  },
  feature3DCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  feature3DContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  feature3DIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  feature3DInfo: {
    flex: 1,
  },
  feature3DTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  feature3DText: {
    fontSize: 13,
    opacity: 0.6,
  },
  registerButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginLinkText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
