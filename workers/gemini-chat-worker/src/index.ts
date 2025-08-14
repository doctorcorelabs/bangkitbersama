import { GoogleGenAI } from '@google/genai';
import { franc } from 'franc-min';
import systemPromptId from './system_prompt_id';
import systemPromptEn from './system_prompt_en';

export interface Env {
	GEMINI_API_KEY: string;
}

// Function to detect language from text
function detectLanguage(text: string): 'eng' | 'ind' {
	const detected = franc(text);
	console.log('Detected language:', detected, 'for text:', text.substring(0, 50) + '...');
	
	// Map franc language codes to our supported languages
	if (detected === 'eng') return 'eng';
	// Indonesian and related languages
	if (detected === 'ind' || detected === 'jav' || detected === 'sun' || detected === 'msa' || detected === 'zlm') return 'ind';
	
	// Additional Indonesian language codes that franc might return
	if (detected === 'id' || detected === 'id_ID' || detected === 'indonesian') return 'ind';
	
	// Fallback: Check for common Indonesian words if franc detection is uncertain
	const indonesianKeywords = [
		'apa', 'siapa', 'kapan', 'dimana', 'bagaimana', 'mengapa', 'kenapa',
		'yang', 'dengan', 'untuk', 'dari', 'ke', 'di', 'pada', 'oleh',
		'adalah', 'itu', 'ini', 'saya', 'anda', 'mereka', 'kami', 'kita',
		'jika', 'ketika', 'sebelum', 'sesudah', 'karena', 'tetapi', 'atau',
		'gangguan', 'kecemasan', 'depresi', 'stres', 'mental', 'kesehatan',
		'terapi', 'obat', 'gejala', 'penyakit', 'dokter', 'psikolog'
	];
	
	const lowerText = text.toLowerCase();
	const indonesianWordCount = indonesianKeywords.filter(word => lowerText.includes(word)).length;
	
	if (indonesianWordCount >= 2) {
		console.log('Detected Indonesian by keywords, count:', indonesianWordCount);
		return 'ind';
	}
	
	// Default to English if detection is uncertain
	return 'eng';
}

// Function to determine the primary language of the conversation
function determineConversationLanguage(message: string, history?: { role: string, parts: { text: string }[] }[]): 'eng' | 'ind' {
	// First, check the current message
	const currentMessageLang = detectLanguage(message);
	
	// If we have history, analyze it too
	if (history && history.length > 0) {
		const userMessages = history
			.filter(msg => msg.role === 'user')
			.map(msg => msg.parts[0]?.text || '')
			.filter(text => text.length > 0);
		
		if (userMessages.length > 0) {
			// Combine all user messages for better language detection
			const allUserText = userMessages.join(' ') + ' ' + message;
			const conversationLang = detectLanguage(allUserText);
			
			// If the conversation has been primarily in one language, stick to it
			if (conversationLang === 'ind' || conversationLang === 'eng') {
				return conversationLang;
			}
		}
	}
	
	// Fallback to current message language
	return currentMessageLang;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'OPTIONS') {
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

			// Determine the language for this conversation
			const conversationLang = determineConversationLanguage(message, history);
			console.log('Input message:', message);
			console.log('Detected language code:', franc(message));
			console.log('Final conversation language:', conversationLang);
			console.log('Using language:', conversationLang === 'eng' ? 'English' : 'Indonesian');
			
			const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
			const systemPromptText = conversationLang === 'eng' ? systemPromptEn : systemPromptId;

			const contents = [
				...(history || []),
				{
					role: 'user',
					parts: [
						{
							text: `${systemPromptText}\n\n${message}`,
						},
					],
				},
			];

			const result = await genAI.models.generateContentStream({
				model: 'gemini-1.5-flash',
				contents,
			});

			const encoder = new TextEncoder();
			const readableStream = new ReadableStream({
				async start(controller) {
					for await (const chunk of result) {
						const chunkText = chunk.text;
						if (chunkText) {
							controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`));
						}
					}
					controller.close();
				},
			});

			return new Response(readableStream, {
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					'Access-Control-Allow-Origin': '*',
				},
			});

		} catch (error) {
			console.error('Error processing request:', error);
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			return new Response(JSON.stringify({ error: 'Failed to process chat request', details: errorMessage }), {
				status: 500,
				headers: { 
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		}
	},
};

function handleOptions(request: Request) {
	let headers = request.headers;
	if (
		headers.get('Origin') !== null &&
		headers.get('Access-Control-Request-Method') !== null &&
		headers.get('Access-Control-Request-Headers') !== null
	) {
		let respHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Max-Age': '86400',
		};
		return new Response(null, { headers: respHeaders });
	} else {
		return new Response(null, {
			headers: {
				Allow: 'POST, OPTIONS',
			},
		});
	}
}
