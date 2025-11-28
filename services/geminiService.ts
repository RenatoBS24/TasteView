import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Falta la API Key de Gemini en el archivo .env");
  console.warn("Configura EXPO_PUBLIC_GEMINI_API_KEY en tu archivo .env");
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  API_KEY;
const formatHistoryForGemini = (messages: any[]) => {
  return messages
    .filter((msg, index) => !(index === 0 && msg.sender === "bot"))
    .map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));
};
export const sendMessageToGemini = async (
  currentHistory: any[],
  newMessage: string
) => {
  try {
    const body = {
      contents: [
        ...formatHistoryForGemini(currentHistory),
        {
          role: "user",
          parts: [{ text: newMessage }],
        },
      ],
    };

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Respuesta cruda de Gemini:", JSON.stringify(data, null, 2));
    console.log("API KEY USADA →", API_KEY);



    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Lo siento, no pude generar una respuesta.";

    return text;
  } catch (error) {
    console.error("Error conectando con Gemini:", error);
    return "Hubo un problema procesando tu solicitud. Intenta de nuevo.";
  }
};
