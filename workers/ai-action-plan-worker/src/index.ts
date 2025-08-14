import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from 'hono/cors';
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from '@google/genai';

// Define the environment bindings
// This should align with your wrangler.toml and secrets
interface Env {
	GEMINI_API_KEY: string;
	// Other bindings from the template can be added here if needed
	// MY_KV_NAMESPACE: KVNamespace;
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	// MY_BUCKET: R2Bucket;
	// MY_SERVICE: Fetcher;
	// MY_QUEUE: Queue;
}

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup CORS middleware
app.use('/api/*', cors()); // Apply CORS to all /api routes

// Setup OpenAPI registry (from template, can be kept or removed if not used)
const openapi = fromHono(app, {
	docs_url: "/docs", // Changed from "/" to avoid conflict if you want a root page
});

// --- Existing Task API endpoints from template (can be kept or removed) ---
// import { TaskCreate } from "./endpoints/taskCreate";
// import { TaskDelete } from "./endpoints/taskDelete";
// import { TaskFetch } from "./endpoints/taskFetch";
// import { TaskList } from "./endpoints/taskList";
// openapi.get("/api/tasks", TaskList);
// openapi.post("/api/tasks", TaskCreate);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);
// --- End of template Task API endpoints ---

// New endpoint for Personal Action Plan
app.post('/api/generate-action-plan', async (c) => {
	try {
		const { inputText, language } = await c.req.json();

		if (!inputText || typeof inputText !== 'string') {
			return c.json({ error: 'inputText is required and must be a string' }, 400);
		}

		const lang = language === 'en' ? 'en' : 'id'; // Default to Indonesian

		const systemPrompt = `You are a compassionate and supportive AI mental health assistant for the "Mynd" application. Your role is to generate a personalized, actionable, and empathetic action plan based on the user's input. The user's input may contain a mix of languages (English and Indonesian), as it includes a summary from a previous assessment and their own additional notes.

**CRITICAL INSTRUCTION:**
No matter what language the user's input is in, you MUST generate the ENTIRE action plan exclusively in the target language specified below. Do not mix languages in your response.

**Target Language: ${lang === 'en' ? 'English' : 'Bahasa Indonesia'}**

**Response Guidelines:**
1.  **Structure:** Organize the plan with clear headings (using markdown '###'), bullet points ('*' or '-'), and bold text ('**text**') for emphasis.
2.  **Tone:** Be empathetic, non-judgmental, and encouraging.
3.  **Content:** Provide practical, evidence-informed steps. Suggest small, manageable actions. If the user mentions severe distress (e.g., self-harm, crisis), the absolute first priority is to strongly and clearly advise them to seek immediate professional help and provide them with generic emergency contact information (e.g., "contact emergency services like 119 in Indonesia or 911 in the US", "look up local crisis hotlines").
4.  **Formatting:** Use markdown for all formatting. Do not output plain text.
5.  **Language:** Adhere strictly to the specified **Target Language** for your entire response.`;

		const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY });
		const modelName = 'gemini-2.0-flash'; // Use a model known for strong instruction-following
		
		// For this SDK version, combine system prompt with user input.
		const fullPrompt = `${systemPrompt}\n\n---\n\nUSER INPUT:\n${inputText}`;

		const contents = [{ role: 'user', parts: [{ text: fullPrompt }] }];

		// Call ai.models.generateContentStream
		const streamResult = await ai.models.generateContentStream({
			model: modelName,
			contents,
			// The 'config' property is not valid here, generationConfig is needed for the model object, not the stream call
		});

		// Transform the AI's stream into a Hono-compatible ReadableStream of text chunks
		const textEncoder = new TextEncoder();
		const readableStream = new ReadableStream({
			async start(controller) {
				try {
					// streamResult is the AsyncGenerator directly
					for await (const chunk of streamResult) {
						const text = chunk.text; // Access as a property based on TS error
						if (text && typeof text === 'string') { // Ensure text is a string
							controller.enqueue(textEncoder.encode(text));
						}
					}
					controller.close();
				} catch (streamError) {
					console.error("Error in stream processing:", streamError);
					// Propagate the error to the ReadableStream controller
					controller.error(streamError instanceof Error ? streamError : new Error('Unknown stream error'));
				}
			},
			cancel(reason) {
				console.log('Stream cancelled:', reason);
				// If the SDK's stream has a cancel method, call it here.
				// For example: streamResult.stream.cancel?.(reason);
			}
		});

		return new Response(readableStream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'X-Content-Type-Options': 'nosniff', // Security header
				'Cache-Control': 'no-cache', // Ensure fresh responses
			},
		});

	} catch (error) {
		console.error('Error in /api/generate-action-plan endpoint:', error);
		const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
		return c.json({ error: 'Failed to generate action plan', details: errorMessage }, 500);
	}
});

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
