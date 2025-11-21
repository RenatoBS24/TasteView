import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Si tienes tus propios componentes 'ThemedText' o colores, impórtalos aquí.
// He usado colores estáticos para asegurar que el código funcione al copiarlo.

export default function PromoCard({ 
  title = "¡Hamburguesa Suprema!", 
  description = "30% de descuento si ordenas ahora desde la web.",
  imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&w=500&q=80", // Imagen de ejemplo
  targetUrl = "https://tu-restaurante.com/promo",
  price = "$12.99"
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Función para cerrar el componente
  const handleClose = () => {
    setIsVisible(false);
  };

  // Función para redirigir a la URL
  const handlePressPromo = async () => {
    const supported = await Linking.canOpenURL(targetUrl);
    if (supported) {
      await Linking.openURL(targetUrl);
    } else {
      Alert.alert("Error", "No se puede abrir el enlace: " + targetUrl);
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.cardContainer}>
      
      {/* Imagen del Plato */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        
        {/* Badge de Precio */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{price}</Text>
        </View>

        {/* Botón Cerrar (X) */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de Texto */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Botón de Acción (CTA) */}
        <TouchableOpacity style={styles.ctaButton} onPress={handlePressPromo}>
          <Text style={styles.ctaText}>Ver Promoción →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Sombra para Android
    overflow: 'hidden', // Asegura que la imagen respete el borde redondeado
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -2, // Pequeño ajuste visual
  },
  priceBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FF6B6B', // Color llamativo (rojo/naranja)
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#2c3e50', // Color primario oscuro
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});