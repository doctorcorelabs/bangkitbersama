import { GoogleGenAI } from "@google/genai";

export interface Env {
  GEMINI_API_KEY: string;
}

interface InterpretationResult {
  domainName: string;
  score: number;
  maxScore: number;
  category: 'Low' | 'Medium' | 'High' | 'Very High';
  message: string;
}

interface RequestBody {
  results: InterpretationResult[];
  language: 'en' | 'id';
}

const modelName = "gemini-2.0-flash";
const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 3000,
  responseMimeType: 'text/plain',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    if (!env.GEMINI_API_KEY) {
      console.error('Gemini API key is not set in worker environment.');
      return new Response(JSON.stringify({ error: 'Server configuration error: Gemini API key not found.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

    let requestBody: RequestBody;
    try {
      requestBody = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return new Response(JSON.stringify({ error: 'Invalid request format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const { results: interpretationResults, language = 'id' } = requestBody;

    if (!interpretationResults || !Array.isArray(interpretationResults) || interpretationResults.length === 0) {
      return new Response(JSON.stringify({ error: 'Interpretation data cannot be empty and must be an array.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const summaryForAI = interpretationResults.map(r =>
      `${r.domainName}: Score ${r.score}/${r.maxScore} (Category: ${r.category})`
    ).join('\n');

    const languageInstruction = language === 'en' 
      ? "Use English language."
      : "Gunakan bahasa Indonesia.";

    const fullPrompt = `You are an empathetic and supportive virtual mental health assistant. Your task is to provide a general interpretation and advice based on the user's mental health check summary.
IMPORTANT:
1.  NEVER provide a medical diagnosis. Always emphasize that this is a preliminary check and not a substitute for professional consultation.
2.  Use language that is easy to understand, warm, and encouraging.
3.  Focus on providing constructive insights and practical, safe self-help tips (e.g., relaxation techniques, light physical activity, maintaining routines).
4.  If there are very high scores, especially on "Disturbing Thoughts", strongly recommend seeking professional help or emergency services, but maintain a supportive tone.
5.  Avoid making promises or exaggerated claims.
6.  Keep the response concise yet informative, with a "maximum" length of 4-5 paragraphs and an output limit of 1500 tokens.
7.  Include a disclaimer that this is an AI interpretation and not from a medical professional.
8.  ${languageInstruction}

Here is the summary of the user's mental health check results:
${summaryForAI}

Please provide a general interpretation, some constructive advice, and a reminder that this is not a diagnosis.`;

    try {
      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ];

      const responseStream = await genAI.models.generateContentStream({
        model: modelName,
        config: generationConfig,
        contents,
      });

      let accumulatedText = "";
      for await (const chunk of responseStream) {
        if (chunk.text) {
          accumulatedText += chunk.text;
        }
      }

      const aiMessage = accumulatedText.trim();

      if (!aiMessage) {
        console.warn('AI response was empty, possibly blocked by safety settings or no content generated.');
        return new Response(JSON.stringify({ interpretation: "Could not generate an interpretation at this time. Please try again later or check your input." }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
        });
      }

      return new Response(JSON.stringify({ interpretation: aiMessage }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });

    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      let errorMessage = 'An error occurred while contacting the Gemini AI service.';
      if (error.message) {
        errorMessage = error.message;
      }
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
        errorMessage += ` Detail: ${error.response.data.error.message}`;
      }
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }
  },
};

function corsHeaders(request: Request) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function handleOptions(request: Request) {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    return new Response(null, {
      headers: corsHeaders(request),
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: 'POST, OPTIONS',
      },
    });
  }
}
