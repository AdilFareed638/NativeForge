import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API client
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `
You are NativeForge, an expert React Native engineer.
Your task is to generate valid, complete Expo Router UI applications.
Return pure JSON objects containing files to create.
Focus on beautiful UI, Reanimated animations, and clean architecture.
`;

export const generateApp = async (prompt, onChunk) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.2, // Low temp for more precise code
      }
    });

    const result = await model.generateContentStream(prompt);
    
    let fullOutput = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullOutput += chunkText;
      if (onChunk) {
        onChunk(chunkText);
      }
    }
    
    return fullOutput;
  } catch (error) {
    console.error('Gemini generation error:', error);
    throw error;
  }
};
