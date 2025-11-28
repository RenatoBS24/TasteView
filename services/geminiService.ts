import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Falta la API Key de Gemini en el archivo .env");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const formatHistoryForGemini = (messages: any[]) => {
  return messages
    .filter((msg, index) => !(index === 0 && msg.sender === 'bot'))
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));
};

export const sendMessageToGemini = async (
  currentHistory: any[], 
  newMessage: string
) => {
  try {
    const chat = model.startChat({
      history: formatHistoryForGemini(currentHistory),
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error conectando con Gemini:", error);
    return "Lo siento, tuve un problema procesando tu solicitud. Intenta de nuevo.";
  }
};