
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Fix: Strictly use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssistantResponse = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
        // Enable thinking to reduce hallucinations and improve strategic reasoning
        thinkingConfig: { thinkingBudget: 4096 }, 
      },
    });

    const text = response.text || "I apologize, but I am unable to process that at the moment.";
    
    // Extract sources from Google Search Grounding metadata
    // This serves as the "annotation" layer at the bottom of the response
    const uniqueSources = new Map();
    
    response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        if (!uniqueSources.has(chunk.web.uri)) {
           uniqueSources.set(chunk.web.uri, {
             title: chunk.web.title,
             uri: chunk.web.uri
           });
        }
      }
    });

    const sources = Array.from(uniqueSources.values());

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
