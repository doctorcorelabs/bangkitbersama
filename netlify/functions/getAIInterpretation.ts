import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

interface InterpretationResult {
  domainName: string;
  score: number;
  maxScore: number;
  category: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  message: string; // Pesan statis yang sudah ada
}

// Pastikan Anda telah mengatur GEMINI_API_KEY di environment variables Netlify
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is not set.');
  // Melempar error atau menangani di level handler jika diperlukan agar tidak crash saat load
}
const genAI = new GoogleGenAI({ apiKey: apiKey || "" });

// Menggunakan model yang lebih umum dan stabil dari SDK
const modelName = "gemini-2.5-flash-preview-05-20"; 

const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1524, // Diubah sesuai permintaan pengguna
  responseMimeType: 'text/plain',
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  if (!process.env.GEMINI_API_KEY) {
    // Ini sudah dicek di atas, tapi double check di handler juga baik
    console.error('Gemini API key is not set in handler.');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Konfigurasi server error: Gemini API key tidak ditemukan.' }),
    };
  }

  let interpretationResults: InterpretationResult[];
  try {
    if (!event.body) {
      throw new Error("Request body is empty");
    }
    interpretationResults = JSON.parse(event.body);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Format permintaan tidak valid.' }),
    };
  }

  if (!interpretationResults || interpretationResults.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Data interpretasi tidak boleh kosong.' }),
    };
  }

  const summaryForAI = interpretationResults.map(r => 
    `${r.domainName}: Skor ${r.score}/${r.maxScore} (Kategori: ${r.category})`
  ).join('\n');

  // Menggabungkan system instruction dan user prompt menjadi satu prompt untuk model Gemini
  // Beberapa model Gemini lebih baik dengan instruksi yang jelas di awal.
  const fullPrompt = `Anda adalah seorang asisten kesehatan mental virtual yang empatik dan suportif. Tugas Anda adalah memberikan interpretasi dan saran umum berdasarkan ringkasan hasil pemeriksaan kondisi mental pengguna.
PENTING:
1.  JANGAN PERNAH memberikan diagnosis medis. Selalu tekankan bahwa ini adalah pemeriksaan awal dan bukan pengganti konsultasi profesional.
2.  Gunakan bahasa yang mudah dipahami, hangat, dan memberi semangat.
3.  Fokus pada memberikan pandangan yang konstruktif dan saran praktis yang aman untuk dilakukan secara mandiri (misalnya, teknik relaksasi, aktivitas fisik ringan, menjaga rutinitas).
4.  Jika ada skor yang sangat tinggi, terutama pada "Pikiran yang Mengganggu", sarankan dengan sangat kuat untuk mencari bantuan profesional atau layanan darurat, namun tetap dengan nada suportif.
5.  Hindari membuat janji atau klaim yang berlebihan.
6.  Jaga agar respons tetap ringkas namun informatif, dengan panjang "maksimal" 200 kata.
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

    const response = await genAI.models.generateContentStream({
      model: modelName,
      config: generationConfig,
      contents,
    });

    let accumulatedText = "";
    for await (const chunk of response) {
      if (chunk.text) {
        accumulatedText += chunk.text;
      }
    }
    
    const aiMessage = accumulatedText.trim();

    if (!aiMessage) {
      // Ini bisa terjadi jika safety settings memblokir respons
      console.warn('Respons AI kosong, mungkin diblokir oleh safety settings atau tidak ada konten yang dihasilkan.');
      return {
        statusCode: 200, // Atau 500 jika ini dianggap error fatal
        body: JSON.stringify({ interpretation: "Tidak dapat menghasilkan interpretasi saat ini. Coba lagi nanti atau periksa input Anda." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ interpretation: aiMessage }),
    };

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    let errorMessage = 'Terjadi kesalahan saat menghubungi layanan AI Gemini.';
    if (error.message) {
        errorMessage = error.message;
    }
    // Cek jika ada detail error dari response (jika ada)
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
        errorMessage += ` Detail: ${error.response.data.error.message}`;
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };
