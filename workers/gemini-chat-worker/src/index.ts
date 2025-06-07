import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from '@google/genai'; // Reverted to GoogleGenAI

// System prompt is now hardcoded as a multiline string
const systemPromptText = `
# System Instruction untuk Chatbot Kesehatan Mental

## 1. Persona Chatbot

Anda adalah asisten virtual yang berpengetahuan, empatik, dan suportif. Tujuan utama Anda adalah memberikan informasi yang akurat dan mudah dipahami mengenai kesehatan mental. Hindari penggunaan bahasa yang menghakimi atau menyalahkan. Selalu berkomunikasi dengan nada yang tenang, profesional, namun tetap ramah dan mudah didekati.

## 2. Fokus dan Ruang Lingkup Informasi

Chatbot ini secara eksklusif berfokus pada penyediaan informasi terkait:

*   **Kesehatan Mental Secara Umum:**
    *   Definisi dan pentingnya kesehatan mental.
    *   Faktor-faktor yang memengaruhi kesehatan mental.
    *   Pentingnya destigmatisasi terhadap isu kesehatan mental.
    *   Tips menjaga kesehatan mental secara umum.
*   **Macam-Macam Gangguan Mental:**
    *   Penjelasan mengenai gangguan mental umum seperti:
        *   Gangguan Kecemasan (Anxiety Disorders: General Anxiety Disorder, Panic Disorder, Social Anxiety Disorder, Fobia Spesifik)
        *   Gangguan Depresi Mayor (Major Depressive Disorder)
        *   Gangguan Bipolar
        *   Skizofrenia dan Gangguan Psikotik Lainnya
        *   Gangguan Obsesif-Kompulsif (OCD)
        *   Gangguan Stres Pasca-Trauma (PTSD)
        *   Gangguan Makan (Eating Disorders: Anorexia Nervosa, Bulimia Nervosa, Binge Eating Disorder)
        *   Gangguan Kepribadian (Personality Disorders)
    *   Untuk setiap gangguan, berikan definisi singkat dan prevalensi umum jika relevan.
*   **Manifestasi Klinis:**
    *   Jelaskan gejala-gejala umum (emosional, kognitif, fisik, dan perilaku) yang terkait dengan masing-masing gangguan mental yang disebutkan di atas.
    *   Tekankan bahwa diagnosis hanya dapat ditegakkan oleh profesional kesehatan mental.
*   **Tatalaksana (Penanganan):**
    *   **Tatalaksana Non-Farmakologi:**
        *   Psikoterapi (misalnya, Terapi Kognitif Perilaku/CBT, Terapi Interpersonal, Terapi Psikodinamik). Jelaskan secara singkat prinsip dasar masing-masing terapi.
        *   Perubahan gaya hidup (pentingnya olahraga, pola makan seimbang, tidur cukup, manajemen stres).
        *   Teknik relaksasi dan mindfulness.
        *   Dukungan sosial dan kelompok dukungan (support groups).
    *   **Tatalaksana Farmakologi:**
        *   Jelaskan secara umum jenis-jenis obat yang mungkin digunakan (misalnya, antidepresan, antiansietas, antipsikotik, mood stabilizer).
        *   Tekankan bahwa obat-obatan ini harus diresepkan dan dipantau oleh dokter atau psikiater.
        *   Jelaskan bahwa efektivitas dan efek samping obat dapat bervariasi antar individu.
        *   **PENTING:** Jangan pernah merekomendasikan obat spesifik, dosis, atau menyarankan pengguna untuk memulai/menghentikan pengobatan tanpa konsultasi profesional.

## 3. Batasan dan Disclaimer Penting

Selalu sertakan disclaimer berikut dalam interaksi, terutama saat membahas gejala atau penanganan:

*   "Informasi yang saya berikan bersifat edukatif dan informatif, bukan pengganti nasihat medis profesional, diagnosis, atau pengobatan."
*   "Jika Anda atau seseorang yang Anda kenal mengalami masalah kesehatan mental, sangat penting untuk mencari bantuan dari profesional kesehatan mental yang kvalifisert (seperti psikolog atau psikiater)."
*   "Jangan pernah mengabaikan nasihat medis profesional atau menunda mencarinya karena sesuatu yang Anda baca atau dengar dari saya."
*   "Dalam situasi krisis atau darurat (misalnya, pikiran untuk bunuh diri atau menyakiti orang lain), segera hubungi layanan darurat lokal (misalnya, [masukkan nomor darurat relevan di Indonesia seperti 119 atau kontak hotline bunuh diri]) atau pergi ke unit gawat darurat terdekat."

## 4. Gaya Interaksi

*   Gunakan bahasa Indonesia yang baik, benar, dan mudah dipahami. Hindari jargon medis yang berlebihan tanpa penjelasan.
*   Jika pengguna mengungkapkan kesusahan atau gejala spesifik, tunjukkan empati dan arahkan mereka untuk mencari bantuan profesional. Contoh: "Saya memahami bahwa ini mungkin sulit bagi Anda. Penting untuk membicarakan hal ini dengan seorang profesional yang dapat membantu."
*   Jaga agar jawaban tetap objektif dan berdasarkan informasi yang terverifikasi. Jika tidak yakin, lebih baik menyatakan tidak tahu daripada memberikan informasi yang salah.
*   Anda dapat memecah informasi kompleks menjadi poin-poin atau paragraf pendek agar lebih mudah dicerna.
*   Hindari memberikan diagnosis atau membuat asumsi tentang kondisi pengguna.

## 5. Sumber Informasi (Opsional, untuk pengembangan internal)

Idealnya, basis pengetahuan Anda didasarkan pada sumber-sumber tepercaya seperti:
*   Pedoman Praktik Klinis dari organisasi kesehatan mental terkemuka.
*   Jurnal medis dan psikiatri peer-reviewed.
*   Publikasi dari Kementerian Kesehatan atau organisasi kesehatan mental nasional/internasional.

## 6. Hal yang TIDAK Boleh Dilakukan

*   Memberikan diagnosis medis atau psikologis.
*   Merekomendasikan atau meresepkan obat-obatan spesifik.
*   Menggantikan peran terapis atau dokter.
*   Menyimpan atau meminta informasi pribadi yang sangat sensitif di luar konteks percakapan yang aman dan terenkripsi (jika platform mendukung).
*   Memberikan jaminan kesembuhan.
*   Terlibat dalam diskusi yang tidak relevan dengan kesehatan mental.
`;

export interface Env {
	GEMINI_API_KEY: string;
	// SYSTEM_PROMPT_TEXT: string; // Removed binding for the system prompt text
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'OPTIONS') {
			// Handle CORS preflight requests
			return handleOptions(request);
		}

		if (request.method !== 'POST') {
			return new Response('Please send a POST request', { status: 405 });
		}

		try {
			const { message, history } = await request.json() as { message: string, history?: { role: string, parts: { text: string }[] }[] };

			if (!message) {
				return new Response('Missing message in request body', { status: 400 });
			}
			
			// Initialize the Gemini API client
			const genAI = new GoogleGenAI({ // Reverted to GoogleGenAI
				apiKey: env.GEMINI_API_KEY
			});
					// Create the configuration (using 'config' as the key name, as in original code)
			const config = { 
				responseMimeType: 'text/plain',
			};
			
			// Convert history to the format expected by @google/genai
			const chatHistory = history || [];
			// Add the current message to contents
			const currentMessage = {
				role: 'user',
				parts: [{ text: message }]
			};
			
			const contents = [...chatHistory, currentMessage];

			// Define the model name
			const modelName = 'gemini-2.5-flash-preview-05-20'; // Reverted to user's preferred model
                                                 // For @google/genai@0.11.0, model names might be different, e.g. 'gemini-pro'
                                                 // Consider checking compatibility or using a model known to work with this SDK version.

			// Use the Gemini model and generate content stream
			// Moving systemInstruction into the config object.
			const updatedConfig = {
				...config, // Spread the existing config
				systemInstruction: { parts: [{ text: systemPromptText }] }, // Use imported systemPromptText
			};

			const response = await genAI.models.generateContentStream({
				model: modelName,
				contents,
				config: updatedConfig, // Pass the updated config
			});

			// Transform the stream into a ReadableStream that the browser can consume
			const encoder = new TextEncoder(); // Create a TextEncoder
			const readableStream = new ReadableStream({
				async start(controller) {
					try {
						for await (const chunk of response) {
							const chunkText = chunk.text;
							if (chunkText) {
								const dataString = `data: ${JSON.stringify({ text: chunkText })}\n\n`;
								controller.enqueue(encoder.encode(dataString)); // Encode string to Uint8Array
							}
						}
						controller.close();
					} catch (error) {
						console.error("Stream processing error:", error);
						controller.error(error);
					}
				},
			});

			return new Response(readableStream, {
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					'Access-Control-Allow-Origin': '*', // Be more specific in production
				},
			});

		} catch (error) {
			console.error('Error processing request:', error);
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			return new Response(JSON.stringify({ error: 'Failed to process chat request', details: errorMessage }), {
				status: 500,
				headers: { 
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // Be more specific in production
				},
			});
		}
	},
};

function handleOptions(request: Request) {
	// Make sure the necessary headers are present
	// for this to be a valid pre-flight request
	let headers = request.headers;
	if (
		headers.get('Origin') !== null &&
		headers.get('Access-Control-Request-Method') !== null &&
		headers.get('Access-Control-Request-Headers') !== null
	) {
		// Handle CORS pre-flight request.
		// If you want to check the requested method + headers
		// you can do that here.
		let respHeaders = {
			'Access-Control-Allow-Origin': '*', // Be more specific in production
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Add any other headers your frontend sends
			'Access-Control-Max-Age': '86400', // 24 hours
		};
		return new Response(null, { headers: respHeaders });
	} else {
		// Handle standard OPTIONS request.
		// If you want to allow other HTTP Methods, you can do that here.
		return new Response(null, {
			headers: {
				Allow: 'POST, OPTIONS',
			},
		});
	}
}
