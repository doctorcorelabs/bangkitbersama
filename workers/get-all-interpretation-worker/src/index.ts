import { GoogleGenAI } from "@google/genai";

export interface Env {
  GEMINI_API_KEY: string;
  // Add other environment variables or bindings here if needed
  // Example: MY_KV_NAMESPACE: KVNamespace;
}

interface InterpretationResult {
  domainName: string;
  score: number;
  maxScore: number;
  category: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  message: string; // Pesan statis yang sudah ada
}

// Model and generation configuration (same as Netlify function)
const modelName = "gemini-2.5-flash-preview-05-20";
const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 3000,
  responseMimeType: 'text/plain',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight requests
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
      return new Response(JSON.stringify({ error: 'Konfigurasi server error: Gemini API key tidak ditemukan.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

    let interpretationResults: InterpretationResult[];
    try {
      interpretationResults = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return new Response(JSON.stringify({ error: 'Format permintaan tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    if (!interpretationResults || !Array.isArray(interpretationResults) || interpretationResults.length === 0) {
      return new Response(JSON.stringify({ error: 'Data interpretasi tidak boleh kosong dan harus berupa array.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const summaryForAI = interpretationResults.map(r =>
      `${r.domainName}: Skor ${r.score}/${r.maxScore} (Kategori: ${r.category})`
    ).join('\n');

    const fullPrompt = `Anda adalah seorang asisten kesehatan mental virtual yang empatik dan suportif. Tugas Anda adalah memberikan interpretasi dan saran umum berdasarkan ringkasan hasil pemeriksaan kondisi mental pengguna.
PENTING:
1.  JANGAN PERNAH memberikan diagnosis medis. Selalu tekankan bahwa ini adalah pemeriksaan awal dan bukan pengganti konsultasi profesional.
2.  Gunakan bahasa yang mudah dipahami, hangat, dan memberi semangat.
3.  Fokus pada memberikan pandangan yang konstruktif dan saran praktis yang aman untuk dilakukan secara mandiri (misalnya, teknik relaksasi, aktivitas fisik ringan, menjaga rutinitas).
4.  Jika ada skor yang sangat tinggi, terutama pada "Pikiran yang Mengganggu", sarankan dengan sangat kuat untuk mencari bantuan profesional atau layanan darurat, namun tetap dengan nada suportif.
5.  Hindari membuat janji atau klaim yang berlebihan.
6.  Jaga agar respons tetap ringkas namun informatif, panjang "maksimal" 4-5 paragraf dengan batas output 1500 token.
7.  Sertakan disclaimer bahwa ini adalah interpretasi AI dan bukan dari tenaga medis profesional.
8.  Gunakan bahasa Indonesia.

Berikut adalah ringkasan hasil pemeriksaan kondisi mental pengguna:
${summaryForAI}

Tolong berikan interpretasi umum, beberapa saran yang membangun, dan pengingat bahwa ini bukan diagnosis.`;

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
        console.warn('Respons AI kosong, mungkin diblokir oleh safety settings atau tidak ada konten yang dihasilkan.');
        return new Response(JSON.stringify({ interpretation: "Tidak dapat menghasilkan interpretasi saat ini. Coba lagi nanti atau periksa input Anda." }), {
          status: 200, // Or 500 if this is considered a fatal error
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
        });
      }

      return new Response(JSON.stringify({ interpretation: aiMessage }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });

    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      let errorMessage = 'Terjadi kesalahan saat menghubungi layanan AI Gemini.';
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

// Helper function to set CORS headers
// IMPORTANT: Adjust the origin to your specific frontend domain for production
// Using '*' is generally not recommended for production environments.
function corsHeaders(request: Request) {
  const requestOrigin = request.headers.get('Origin');
  // In a production environment, you should replace '*' with your actual frontend domain
  // e.g., 'https://your-frontend-app.com'
  // For local development, you might allow specific local origins or keep '*'
  const allowedOrigins = ['http://localhost:8080', 'http://localhost:8888', 'http://localhost:5173', 'https://your-production-domain.com']; // Add your frontend origins

  let origin = '*'; // Default to wildcard, but ideally restrict this
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    origin = requestOrigin;
  } else if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
    // If the origin is present but not in the allowed list,
    // it's better not to send Access-Control-Allow-Origin to avoid issues.
    // Or, for stricter control, you might deny the request.
    // For now, we'll fall back to '*' if no specific match, but this should be reviewed.
    // console.warn(`Origin ${requestOrigin} not in allowed list. Defaulting to '*' for CORS.`);
  }


  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Add any other headers your client sends
  };
}

// Handle CORS preflight requests
function handleOptions(request: Request) {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS preflight requests.
    return new Response(null, {
      headers: corsHeaders(request),
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'POST, OPTIONS',
      },
    });
  }
}
