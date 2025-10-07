import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const recentCaptures = [
    { id: 1, name: 'Captura 1', date: 'Hace 2 horas', emoji: '', status: 'Completado' },
    { id: 2, name: 'Captura 2', date: 'Hace 1 día', emoji: '', status: 'Completado' },
    { id: 3, name: 'Captura 3', date: 'Hace 2 días', emoji: '', status: 'Completado' },
  ];

  return (
    <ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
            <ThemedText style={styles.title}>Capturar Plato</ThemedText>
            <ThemedText style={styles.subtitle}>Taste View</ThemedText>
        </View>

        <View style={styles.cameraSection}>
            <View style={[styles.cameraViewfinder, { backgroundColor: colors.border }]}>
            <Text style={styles.cameraIcon}>📸</Text>
            <ThemedText style={styles.cameraText}>Vista de cámara</ThemedText>
            <ThemedText style={styles.cameraHint}>
                Coloca el plato en el centro del marco
            </ThemedText>
            
            <View style={[styles.frameGuide, { borderColor: colors.primary }]} />
            </View>
        </View>

        <View style={styles.instructionsSection}>
            <ThemedText style={styles.instructionsTitle}>Instrucciones:</ThemedText>
            <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>1</Text>
                <ThemedText style={styles.instructionText}>
                Coloca el plato sobre una superficie plana y bien iluminada
                </ThemedText>
            </View>
            <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>2</Text>
                <ThemedText style={styles.instructionText}>
                Toma 4-6 fotos desde diferentes ángulos
                </ThemedText>
            </View>
            <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>3</Text>
                <ThemedText style={styles.instructionText}>
                La IA generará automáticamente el modelo 3D
                </ThemedText>
            </View>
            </View>
        </View>

        <View style={styles.controlsSection}>
            <TouchableOpacity
            style={[styles.captureButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
            >
            <Text style={styles.captureButtonIcon}>📷</Text>
            <Text style={styles.captureButtonText}>Capturar Foto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            activeOpacity={0.7}
            >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                Subir desde galería
            </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.recentSection}>
            <ThemedText style={styles.recentTitle}>Capturas Recientes</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentList}>
            {recentCaptures.map((item) => (
                <TouchableOpacity
                key={item.id}
                style={[styles.recentItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
                >
                <Text style={styles.recentEmoji}>{item.emoji}</Text>
                <ThemedText style={styles.recentName}>{item.name}</ThemedText>
                <ThemedText style={styles.recentDate}>{item.date}</ThemedText>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'Completado' ? '#10B981' : '#F59E0B' }
                ]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
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
  cameraSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cameraViewfinder: {
    height: 300,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  cameraText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cameraHint: {
    fontSize: 12,
    opacity: 0.6,
  },
  frameGuide: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 100,
    borderStyle: 'dashed',
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B7280',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  controlsSection: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 25,
  },
  captureButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  captureButtonIcon: {
    fontSize: 24,
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recentSection: {
    paddingLeft: 20,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  recentList: {
    gap: 12,
    paddingRight: 20,
  },
  recentItem: {
    width: 140,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  recentEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  recentDate: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});
