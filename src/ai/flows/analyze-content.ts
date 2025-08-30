'use server';
/**
 * @fileOverview Analyzes social media content and provides suggestions for improvement.
 *
 * - analyzeContent - A function that analyzes content and returns improvement suggestions.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentInputSchema = z.object({
  content: z.string().describe('The social media content to analyze.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  claritySuggestions: z.string().describe('Suggestions for improving the clarity of the content.'),
  sentimentSuggestions: z.string().describe('Suggestions for improving the sentiment of the content.'),
  callToActionSuggestions: z
    .string()    
    .describe('Suggestions for improving the call to action in the content.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema, format: 'json'},
  prompt: `You are an AI social media expert. Analyze the following content and provide suggestions for improvements in clarity, sentiment, and call-to-actions to increase engagement.

Analyze the following content:
---
{{{content}}}
---

Provide your analysis in a structured JSON format. For each of the following keys, provide a string with your suggestions: "claritySuggestions", "sentimentSuggestions", "callToActionSuggestions".`,
});

const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to return a valid analysis. Please try again.");
    }
    return output;
  }
);
