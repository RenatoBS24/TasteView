import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantMenuManagerScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [qrModalVisible, setQrModalVisible] = useState(false);
  
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.capitcix.com.pe`;
  //const qrImageUrl = `https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png`;

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Ceviche mixto', price: 'S/. 35.00', category: 'Platos de Fondo', has3D: true },
    { id: 2, name: 'Ceviche Clásico', price: 'S/. 28.00', category: 'Entradas', has3D: true },
    { id: 3, name: 'Torta de choclo', price: 'S/. 22.00', category: 'Platos de Fondo', has3D: false },
  ]);

  const handleImportExcel = () => {
    Alert.alert(
      'Importar desde Excel',
      'Selecciona un archivo Excel (.xlsx) con tu menú',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Seleccionar archivo', onPress: () => console.log('Importar Excel') }
      ]
    );
  };

  const handleAddManually = () => {
    
  };

  const handleAdd3DPhotos = (itemId: number) => {
    router.push('/camera');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Paisa norteño</ThemedText>
        <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjwuKyRuD1RdIdAMYbLZ77XkUocCTkkrG9w&s'}} style={{width:40,height:40,borderRadius:20}}/>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.primaryActionButton, { backgroundColor: colors.primary }]}
            onPress={handleImportExcel}
            activeOpacity={0.7}
          >
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt__gdZwhO3aSPCNy6b8HwnR5E5AARVCA1wQ&s'}} style={{width:50,height:50,borderRadius:25}}/>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonTitle}>Importar desde Excel</Text>
              <Text style={styles.actionButtonSubtitle}>
                Carga tu menú completo en un solo paso
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleAddManually}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonIcon}>➕</Text>
            <View style={styles.actionButtonContent}>
              <Text style={[styles.actionButtonTitle, { color: colors.text }]}>
                Agregar Manualmente
              </Text>
              <Text style={[styles.actionButtonSubtitle, { color: colors.text }]}>
                Añade platos uno por uno
              </Text>
            </View>
          </TouchableOpacity>
          
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.infoIcon}>📋</Text>
          <View style={styles.infoContent}>
            <ThemedText style={styles.infoTitle}>Formato de Excel requerido</ThemedText>
            <ThemedText style={styles.infoText}>
              Columnas: Nombre, Precio, Categoría, Descripción{'\n'}
              Ejemplo: Lomo Saltado, 35.00, Platos de Fondo, Delicioso...
            </ThemedText>
            <TouchableOpacity style={styles.downloadTemplateButton} activeOpacity={0.7}>
              <Text style={[styles.downloadTemplateText, { color: colors.primary }]}>
                📥 Descargar plantilla
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.secondaryActionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => setQrModalVisible(true)} 
            activeOpacity={0.7}
          >
            <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png'}} style={{width:40,height:40,borderRadius:20}}/>
            <View style={styles.actionButtonContent}>
              <Text style={[styles.actionButtonTitle, { color: colors.text }]}>
                Código QR
              </Text>
              <Text style={[styles.actionButtonSubtitle, { color: colors.text }]}>
                Genera un código QR para compartir el menú
              </Text>
            </View>
          </TouchableOpacity>
          
        </View>

        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <ThemedText style={styles.sectionTitle}>
              Menú Actual ({menuItems.length} platos)
            </ThemedText>
            <View style={[styles.stats3D, { backgroundColor: colors.border }]}>
              <Text style={styles.stats3DText}>
                {menuItems.filter(item => item.has3D).length} con 3D
              </Text>
            </View>
          </View>

          {menuItems.map((item) => (
            <View
              key={item.id}
              style={[styles.menuItemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.menuItemHeader}>
                <View style={styles.menuItemInfo}>
                  <ThemedText style={styles.menuItemName}>{item.name}</ThemedText>
                  <ThemedText style={styles.menuItemCategory}>{item.category}</ThemedText>
                </View>
                <ThemedText style={styles.menuItemPrice}>{item.price}</ThemedText>
              </View>

              <View style={styles.menuItemActions}>
                {item.has3D ? (
                  <View style={[styles.badge3D, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.badge3DText}>✓ 3D Listo</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.add3DButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleAdd3DPhotos(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.add3DButtonText}>📸 Agregar Fotos 3D</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.itemActionButtons}>
                  <TouchableOpacity style={styles.itemActionButton} activeOpacity={0.7}>
                    <Text style={styles.itemActionIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.itemActionButton} activeOpacity={0.7}>
                    <Text style={styles.itemActionIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.helpSection}>
          <ThemedText style={styles.helpTitle}>¿Necesitas ayuda?</ThemedText>
          <TouchableOpacity
            style={[styles.helpButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={styles.helpButtonIcon}>📞</Text>
            <ThemedText style={styles.helpButtonText}>Contactar Soporte</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={qrModalVisible}
        onRequestClose={() => setQrModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={styles.modalTitle}>Menú QR</ThemedText>
            
            <View style={styles.qrContainer}>
              <Image 
                source={{ uri: qrImageUrl }} 
                style={styles.qrImage} 
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.modalSubtitle, { color: colors.text }]}>
              Escanea para ver el menú
            </Text>

            {/* ZONA DE BOTONES (Solo visual) */}
            <View style={styles.modalActions}>
              
              {/* Fila de opciones */}
              <View style={styles.rowActions}>
                <TouchableOpacity 
                  style={[styles.actionOptionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                  onPress={() => console.log("Click en Compartir")} 
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionIcon}>🔗</Text>
                  <ThemedText style={styles.optionText}>Compartir</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionOptionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                  onPress={() => console.log("Click en Descargar")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionIcon}>⬇️</Text>
                  <ThemedText style={styles.optionText}>Descargar</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Botón Cerrar */}
              <TouchableOpacity 
                style={[styles.closeButtonFull, { backgroundColor: colors.primary }]}
                onPress={() => setQrModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  actionButtons: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  actionButtonIcon: {
    fontSize: 32,
  },
  actionButtonContent: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 30,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 10,
  },
  downloadTemplateButton: {
    alignSelf: 'flex-start',
  },
  downloadTemplateText: {
    fontSize: 13,
    fontWeight: '600',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stats3D: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  stats3DText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  menuItemCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
    fontSize: 13,
    opacity: 0.6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge3D: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  badge3DText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  add3DButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  add3DButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  itemActionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  itemActionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemActionIcon: {
    fontSize: 18,
  },
  guide3DCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 30,
  },
  guide3DIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  guide3DContent: {
    flex: 1,
  },
  guide3DTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  guide3DText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 20,
  },
  helpSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  helpButtonIcon: {
    fontSize: 20,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  modalSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
  },
  // Estilos de los botones del Modal
  modalActions: {
    width: '100%',
    gap: 12,
  },
  rowActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionOptionButton: {
    flex: 1, // Esto hace que ambos botones tengan el mismo ancho
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  closeButtonFull: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
