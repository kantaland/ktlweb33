
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is missing from environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return genAI;
};

export const initializeChat = (): void => {
  const ai = getAI();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.9,
    },
  });
};

export const sendMessageToKantaBot = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
     return "System Error: Neural link offline.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Connection glitch...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Signal lost. Reconnecting...";
  }
};

export const generateCreativeIdea = async (): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Generate a short, 1-sentence, abstract and creative 'Daily Inspiration' quote for a digital artist or content creator. Make it sound profound but slightly tech-focused.",
        });
        return response.text || "Create what does not yet exist.";
    } catch (error) {
        return "Create what does not yet exist.";
    }
};

export const consultTermSheet = async (message: string, projectContext: string): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `User Query: "${message}"\n\nProject Data: ${projectContext}`,
            config: {
                systemInstruction: `You are an expert Investment Analyst for KANTALAND. Explain details clearly and professionally.`,
            }
        });
        return response.text || "Analysis unavailable.";
    } catch (error) {
        return "Consultation offline.";
    }
};

export const refineInvestmentTerm = async (field: string, draft: string): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Rewrite professionally: "${draft}" (Field: ${field})`
        });
        return response.text || draft;
    } catch (error) {
        return draft;
    }
};

export const analyzeDealStructure = async (description: string): Promise<any | null> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze this deal description and return JSON mapping title, category, fundingGoal, valuation, equity, and description: "${description}"`,
            config: { 
                responseMimeType: 'application/json' 
            }
        });
        return response.text ? JSON.parse(response.text.trim()) : null;
    } catch (error) {
        return null;
    }
};

export const generateLegalContract = async (projectData: any): Promise<any | null> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a formal VC Term Sheet (HTML) and Wiring Instructions for: ${JSON.stringify(projectData)}`,
            config: { 
                responseMimeType: 'application/json' 
            }
        });
        return response.text ? JSON.parse(response.text.trim()) : null;
    } catch (error) {
        return null;
    }
};

export const analyzePressLink = async (url: string): Promise<any | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract article metadata for: "${url}"`,
      config: { 
        tools: [{googleSearch: {}}], 
        responseMimeType: 'application/json' 
      }
    });
    return response.text ? JSON.parse(response.text.trim()) : null;
  } catch (error) {
    return null;
  }
};

export const analyzeSpotifyLink = async (url: string): Promise<any | null> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Extract track metadata for: "${url}"`,
            config: { 
                tools: [{googleSearch: {}}], 
                responseMimeType: 'application/json' 
            }
        });
        return response.text ? JSON.parse(response.text.trim()) : null;
    } catch (error) {
        return null;
    }
};
