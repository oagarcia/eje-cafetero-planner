import { GoogleGenAI } from "@google/genai";
import { BRIEFING_CONTEXT } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key no configurada. Por favor verifica tu entorno.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: BRIEFING_CONTEXT,
        thinkingConfig: { thinkingBudget: 0 } // Low latency
      }
    });

    return response.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Hubo un error al conectar con el asistente. Intenta de nuevo.";
  }
};