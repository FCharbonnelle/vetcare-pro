import { isMockMode } from './supabase';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface OCRResult {
  visit_date: string;
  record_type: 'Invoice' | 'Prescription' | 'Vaccination' | 'Other';
  extracted_info: string;
}

export const scanHealthRecord = async (imageUri: string): Promise<OCRResult> => {
  if (isMockMode || !GEMINI_API_KEY) {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      visit_date: new Date().toISOString().split('T')[0],
      record_type: 'Vaccination',
      extracted_info: 'Rappel annuel de vaccination effectué avec succès. Prochain rappel dans 1 an.'
    };
  }

  try {
    // Robust conversion from URI to base64 for Gemini
    const responseImg = await fetch(imageUri);
    const blob = await responseImg.blob();
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const prompt = "Extract the main information from this veterinary record image. Provide extraction in French. Format the output as JSON with visit_date (YYYY-MM-DD), record_type (Invoice, Prescription, Vaccination, or Other), and a brief extracted_info summary.";

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: "image/jpeg", data: base64 } }
          ]
        }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    if (!data?.candidates?.[0]) {
      throw new Error('Could not analyze document.');
    }
    let text = data.candidates[0].content.parts[0].text;
    // Remove potential markdown code blocks
    text = text.replace(/```json\n?|```/g, '');
    return JSON.parse(text) as OCRResult;
  } catch (error) {
    console.error('OCR scanning failed:', error);
    throw new Error('Failed to scan document. Please try again.');
  }
};
