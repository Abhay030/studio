import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-content.ts';
import '@/ai/flows/generate-engagement-suggestions.ts';
import '@/ai/flows/extract-text.ts';
import '@/ai/genkit.ts';
