import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState<'user' | 'restaurant'>('user');

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.border }]}>
            <Text style={styles.logoIcon}>🍽️</Text>
          </View>
          <ThemedText style={styles.appName}>TasteView</ThemedText>
          <ThemedText style={styles.tagline}>
            Visualiza menús en 3D
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.accountTypeSelector}>
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                { backgroundColor: colors.card, borderColor: colors.border },
                accountType === 'user' && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => setAccountType('user')}
              activeOpacity={0.7}
            >
              <Text style={styles.accountTypeIcon}>👤</Text>
              <Text style={[
                styles.accountTypeText,
                { color: colors.text },
                accountType === 'user' && { color: '#FFFFFF', fontWeight: '600' }
              ]}>
                Usuario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                { backgroundColor: colors.card, borderColor: colors.border },
                accountType === 'restaurant' && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => setAccountType('restaurant')}
              activeOpacity={0.7}
            >
              <Text style={styles.accountTypeIcon}>🏪</Text>
              <Text style={[
                styles.accountTypeText,
                { color: colors.text },
                accountType === 'restaurant' && { color: '#FFFFFF', fontWeight: '600' }
              ]}>
                Restaurante
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={[
                styles.tab,
                isLogin && { backgroundColor: colors.primary }
              ]}
              onPress={() => setIsLogin(true)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                isLogin ? styles.tabTextActive : { color: colors.text }
              ]}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                !isLogin && { backgroundColor: colors.primary }
              ]}
              onPress={() => setIsLogin(false)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                !isLogin ? styles.tabTextActive : { color: colors.text }
              ]}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  placeholder="Nombre completo"
                  placeholderTextColor={colors.secondary}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            )}

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={colors.secondary}
                secureTextEntry
                style={[styles.input, { color: colors.text }]}
              />
            </View>

            {!isLogin && (
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={colors.secondary}
                  secureTextEntry
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            )}

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
                <ThemedText style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </ThemedText>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryButtonText}>
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <ThemedText style={styles.dividerText}>o continuar con</ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={styles.socialIcon}>🔵</Text>
                <ThemedText style={styles.socialText}>Google</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={styles.socialIcon}>⚫</Text>
                <ThemedText style={styles.socialText}>Apple</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {!isLogin && accountType === 'restaurant' && (
            <TouchableOpacity
              style={[styles.fullRegisterButton, { borderColor: colors.primary }]}
              onPress={() => router.push('/restaurant-register')}
              activeOpacity={0.7}
            >
              <Text style={[styles.fullRegisterText, { color: colors.primary }]}>
                O completa el registro completo de restaurante →
              </Text>
            </TouchableOpacity>
          )}

          {!isLogin && (
            <View style={styles.termsContainer}>
              <ThemedText style={styles.termsText}>
                Al registrarte aceptas nuestros{' '}
                <ThemedText style={[styles.termsLink, { color: colors.primary }]}>
                  Términos y Condiciones
                </ThemedText>
              </ThemedText>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
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
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    opacity: 0.6,
  },
  formContainer: {
    flex: 1,
  },
  accountTypeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  accountTypeIcon: {
    fontSize: 20,
  },
  accountTypeText: {
    fontSize: 14,
  },
  tabSelector: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    opacity: 0.7,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    opacity: 0.5,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
  },
  fullRegisterButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 12,
  },
  fullRegisterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  termsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  termsLink: {
    fontWeight: '600',
  },
});
