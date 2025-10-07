import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddReviewScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.back();
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <ThemedText style={styles.title}>Agregar Reseña</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <View style={[styles.restaurantInfo, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR1dubu5XkFUU25TNmn9Er85UgCvWEc4IGw&s'}} style={{width:40,height:40,borderRadius:20}}/>
          <View>
            <ThemedText style={styles.restaurantName}>Noly</ThemedText>
            <ThemedText style={styles.restaurantCuisine}>Sandwicheria</ThemedText>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <ThemedText style={styles.sectionTitle}>Tu calificación</ThemedText>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
                style={styles.starButton}
              >
                <Text style={[
                  styles.star,
                  star <= rating && styles.starFilled
                ]}>
                  {star <= rating ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <View style={styles.ratingFeedback}>
              <ThemedText style={styles.ratingText}>
                {rating === 1 && '😞 Malo'}
                {rating === 2 && '😕 Regular'}
                {rating === 3 && '😐 Bueno'}
                {rating === 4 && '😊 Muy bueno'}
                {rating === 5 && '🤩 Excelente'}
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.commentSection}>
          <ThemedText style={styles.sectionTitle}>Tu opinión</ThemedText>
          <View style={[styles.textAreaContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput
              placeholder="Cuéntanos tu experiencia..."
              placeholderTextColor={colors.secondary}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={[styles.textArea, { color: colors.text }]}
            />
          </View>
          <ThemedText style={styles.characterCount}>
            {comment.length}/500 caracteres
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: rating > 0 && comment.length > 10 ? colors.primary : colors.secondary },
            rating === 0 || comment.length <= 10 ? styles.submitButtonDisabled : null
          ]}
          onPress={handleSubmit}
          disabled={rating === 0 || comment.length <= 10}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Publicar Reseña</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={styles.successIcon}>✅</Text>
            <ThemedText style={styles.successTitle}>¡Reseña enviada!</ThemedText>
            <ThemedText style={styles.successText}>
              Gracias por compartir tu opinión
            </ThemedText>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 30,
    gap: 12,
  },
  restaurantEmoji: {
    fontSize: 40,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    opacity: 0.6,
  },
  ratingSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starButton: {
    padding: 8,
  },
  star: {
    fontSize: 40,
    opacity: 0.3,
  },
  starFilled: {
    opacity: 1,
  },
  ratingFeedback: {
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  textAreaContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    minHeight: 150,
  },
  textArea: {
    fontSize: 16,
    lineHeight: 22,
  },
  characterCount: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 8,
    textAlign: 'right',
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 20,
  },
  submitButton: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
