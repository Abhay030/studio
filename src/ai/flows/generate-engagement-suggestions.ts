'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating engagement suggestions for social media content.
 *
 * - generateEngagementSuggestions - A function that takes social media content as input and returns AI-generated suggestions for improvement.
 * - GenerateEngagementSuggestionsInput - The input type for the generateEngagementSuggestions function.
 * - GenerateEngagementSuggestionsOutput - The return type for the generateEngagementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEngagementSuggestionsInputSchema = z.object({
  content: z.string().describe('The social media content to analyze.'),
});
export type GenerateEngagementSuggestionsInput = z.infer<typeof GenerateEngagementSuggestionsInputSchema>;

const GenerateEngagementSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('AI-generated suggestions for improving the social media content.'),
});
export type GenerateEngagementSuggestionsOutput = z.infer<typeof GenerateEngagementSuggestionsOutputSchema>;

export async function generateEngagementSuggestions(
  input: GenerateEngagementSuggestionsInput
): Promise<GenerateEngagementSuggestionsOutput> {
  return generateEngagementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEngagementSuggestionsPrompt',
  input: {schema: GenerateEngagementSuggestionsInputSchema},
  output: {schema: GenerateEngagementSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide suggestions for improving social media content engagement.
  Analyze the following content and provide suggestions for improving clarity, sentiment, and calls to action.

  Content: {{{content}}}

  Suggestions:`,
});

const generateEngagementSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateEngagementSuggestionsFlow',
    inputSchema: GenerateEngagementSuggestionsInputSchema,
    outputSchema: GenerateEngagementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
