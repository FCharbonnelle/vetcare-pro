import { isMockMode } from './supabase';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface AIResponse {
  severity: 'Low' | 'Medium' | 'High' | 'Emergency';
  advice: string;
  warning: string;
}

export const analyzeSymptoms = async (petName: string, petInfo: string, symptoms: string): Promise<AIResponse> => {
  if (isMockMode || !GEMINI_API_KEY) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      severity: 'Medium',
      advice: `Based on the symptoms described for ${petName}, it could be mild dehydration or a minor infection. Keep a close eye on them for 24h.`,
      warning: 'In case of vomiting or lethargy, consult a veterinarian immediately.'
    };
  }

  try {
    const prompt = `You are an expert veterinarian assistant. A pet owner is asking about their pet's symptoms.
    Pet Name: ${petName}
    Pet Info: ${petInfo}
    Symptoms: ${symptoms}

    Provide a concise assessment in French including severity (Faible, Modérée, Élevée, Urgence), practical advice, and a warning.
    Format the output as a JSON object: {"severity": "...", "advice": "...", "warning": "..."}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    if (!data?.candidates?.[0]) {
      throw new Error('No assessment available for these symptoms.');
    }
    let text = data.candidates[0].content.parts[0].text;
    // Clean potential markdown blocks
    text = text.replace(/```json\n?|```/g, '');
    const result = JSON.parse(text);
    return result as AIResponse;
  } catch (error) {
    console.error('AI Analysis failed:', error);
    throw new Error('Failed to analyze symptoms. Please try again later.');
  }
};
