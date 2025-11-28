import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Text
} from 'react-native';

// Definición de tipos para escalabilidad
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function SupportChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const flatListRef = useRef<FlatList>(null);

  // Estado del input
  const [inputText, setInputText] = useState('');
  
  // Estado de carga (Typing indicator)
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Estado de mensajes iniciales
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de soporte. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);

  // Función para hacer scroll al fondo cuando llega un mensaje
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  // Lógica principal de envío
  const handleSend = async () => {
    if (inputText.trim().length === 0) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // 1. Agregar mensaje del usuario
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsBotTyping(true);

    // 2. SIMULACIÓN DE LLAMADA A GEMINI (Aquí integrarás la API después)
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponseText = "Entiendo tu consulta. Como soy una demo, aún no conecto con Gemini, pero mi estructura está lista para recibir la respuesta de la IA.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      // Manejar error en UI
    } finally {
      setIsBotTyping(false);
    }
  };

  // Renderizado de cada burbuja de mensaje
  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.messageBubble, 
        isUser ? styles.userBubble : styles.botBubble,
        { 
          backgroundColor: isUser ? colors.primary : colors.card,
          borderColor: isUser ? colors.primary : colors.border,
          alignSelf: isUser ? 'flex-end' : 'flex-start'
        }
      ]}>
        <ThemedText style={[
          styles.messageText, 
          { color: isUser ? '#FFFFFF' : undefined } // Texto blanco si es usuario
        ]}>
          {item.text}
        </ThemedText>
        <Text style={[
          styles.timestamp, 
          { color: isUser ? 'rgba(255,255,255,0.7)' : 'rgba(128,128,128,0.6)' }
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header Simple */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.headerIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <View>
            <ThemedText style={styles.headerTitle}>Soporte Virtual</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Con tecnología Gemini</ThemedText>
        </View>
      </View>

      {/* Lista de Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          isBotTyping ? (
            <View style={styles.typingIndicator}>
               <ActivityIndicator size="small" color={colors.primary} />
               <ThemedText style={styles.typingText}>Escribiendo...</ThemedText>
            </View>
          ) : null
        )}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: colors.primary, opacity: inputText.trim() ? 1 : 0.5 }]} 
            onPress={handleSend}
            disabled={!inputText.trim() || isBotTyping}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    marginBottom: 4,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    gap: 8,
  },
  typingText: {
    fontSize: 12,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: 'white',
    fontSize: 18,
    marginLeft: 2, // Ajuste visual óptico
  },
});