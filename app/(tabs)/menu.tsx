import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
  });

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Ceviche de Tollo', price: 'S/. 35.00', category: 'Platos de Fondo', emoji: '🥩', image: 'https://comidasperuanas.net/wp-content/uploads/2024/04/Receta-de-Ceviche-de-Toyo.jpg' },
    { id: 2, name: 'Ceviche mixto', price: 'S/. 48.00', category: 'Platos de fondo', emoji: '🐟',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdfxQIB0koDq5mrLiOq_q9-pAq44uvawzfg&s' },
    { id: 3, name: 'Tortita de choclo', price: 'S/. 12.00', category: 'Entradas', emoji: '🍗', image:'https://img-global.cpcdn.com/recipes/0b417a5bb2eb4b44/1200x630cq80/photo.jpg' },
    { id: 4, name: 'Papa rellena', price: 'S/. 18.00', category: 'Entradas', emoji: '🥔' ,image:'https://i.pinimg.com/736x/23/e1/59/23e1592c93916fcf15111edafe4b27a4.jpg'},
    { id: 5, name: 'Plato 5', price: 'S/. 25.00', category: 'Parrillas', emoji: '🍢',Image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcomidasperuanas.net%2Fceviche-de-toyo%2F&psig=AOvVaw3-70YOkirbNd412brx3XPg&ust=1759541689917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiQpd7xhpADFQAAAAAdAAAAABAE' },
    { id: 6, name: 'Plato 6', price: 'S/. 38.00', category: 'Platos de Fondo', emoji: '🦐',Image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcomidasperuanas.net%2Fceviche-de-toyo%2F&psig=AOvVaw3-70YOkirbNd412brx3XPg&ust=1759541689917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiQpd7xhpADFQAAAAAdAAAAABAE' },
  ]);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      category: item.category,
    });
    setShowEditModal(true);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmEdit = () => {
    setMenuItems(menuItems.map(item => 
      item.id === selectedItem.id 
        ? { ...item, name: editForm.name, price: editForm.price, category: editForm.category }
        : item
    ));
    setShowEditModal(false);
    Alert.alert('¡Éxito!', 'Plato actualizado correctamente');
  };

  const confirmDelete = () => {
    setMenuItems(menuItems.filter(item => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    Alert.alert('Eliminado', 'El plato ha sido eliminado');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>El paisa norteño</ThemedText>
        <ThemedText style={styles.subtitle}>Menu 3D</ThemedText>
      </View>

      <View style={styles.viewerSection}>
        <View style={[styles.viewer3D, { backgroundColor: colors.border }]}>
          <Text style={styles.viewer3DIcon}>🍽️</Text>
          <ThemedText style={styles.viewer3DText}>Vista 3D del Plato</ThemedText>
          <View style={styles.controlsHint}>
            <Text style={[styles.controlIcon, { color: colors.icon }]}>↻</Text>
            <ThemedText style={styles.controlText}>Desliza para rotar</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <ThemedText style={styles.dishName}>Ceviche</ThemedText>
        <ThemedText style={styles.dishPrice}>S/. 35.00</ThemedText>
        <ThemedText style={styles.dishDescription}>
          Ceviche de tollo
        </ThemedText>
      </View>

      <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Otros Platos</ThemedText>
        {menuItems.map((item) => (
          <View
            key={item.id}
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <ThemedText style={styles.menuItemName}>{item.name}</ThemedText>
              <ThemedText style={styles.menuItemCategory}>{item.category}</ThemedText>
              <ThemedText style={styles.menuItemPrice}>{item.price}</ThemedText>
            </View>
            <View style={styles.menuItemActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton, { backgroundColor: colors.primary }]}
                onPress={() => handleEdit(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton, { backgroundColor: '#EF4444' }]}
                onPress={() => handleDelete(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal de Editar */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Editar Plato</ThemedText>
              <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombre del plato</ThemedText>
                <TextInput
                  value={editForm.name}
                  onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Nombre del plato"
                  placeholderTextColor={colors.secondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Precio</ThemedText>
                <TextInput
                  value={editForm.price}
                  onChangeText={(text) => setEditForm({ ...editForm, price: text })}
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="S/. 0.00"
                  placeholderTextColor={colors.secondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Categoría</ThemedText>
                <TextInput
                  value={editForm.category}
                  onChangeText={(text) => setEditForm({ ...editForm, category: text })}
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Categoría"
                  placeholderTextColor={colors.secondary}
                />
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowEditModal(false)}
                activeOpacity={0.7}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.primary }]}
                onPress={confirmEdit}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextWhite}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Eliminar */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.deleteModalContent, { backgroundColor: colors.background }]}>
            <Text style={styles.deleteIcon}>⚠️</Text>
            <ThemedText style={styles.deleteTitle}>¿Eliminar plato?</ThemedText>
            <ThemedText style={styles.deleteMessage}>
              ¿Estás seguro de que deseas eliminar "{selectedItem?.name}"? Esta acción no se puede deshacer.
            </ThemedText>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowDeleteModal(false)}
                activeOpacity={0.7}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: '#EF4444' }]}
                onPress={confirmDelete}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextWhite}>Eliminar</Text>
              </TouchableOpacity>
            </View>
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
  viewerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewer3D: {
    height: 250,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewer3DIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  viewer3DText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  controlsHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlIcon: {
    fontSize: 24,
  },
  controlText: {
    fontSize: 12,
    opacity: 0.6,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.8,
    marginBottom: 12,
  },
  dishDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  menuItemEmoji: {
    fontSize: 36,
    marginRight: 15,
  },
  menuItemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemCategory: {
    fontSize: 12,
    opacity: 0.6,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  menuItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    // backgroundColor aplicado dinámicamente
  },
  deleteButton: {
    // backgroundColor aplicado dinámicamente
  },
  actionButtonText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  modalForm: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    // backgroundColor aplicado dinámicamente
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextWhite: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteModalContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  deleteIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deleteMessage: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
});
