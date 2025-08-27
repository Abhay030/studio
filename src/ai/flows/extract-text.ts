'use server';
/**
 * @fileOverview A flow for extracting text from a document (image or PDF).
 *
 * - extractTextFromDocument - Extracts text from an image or PDF file.
 * - ExtractTextFromDocumentInput - The input type for the extractTextFromDocument function.
 * - ExtractTextFromDocumentOutput - The return type for the extractTextFromDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import PDFParser from 'pdf2json';

const ExtractTextFromDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document (image or PDF), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type ExtractTextFromDocumentInput = z.infer<typeof ExtractTextFromDocumentInputSchema>;

const ExtractTextFromDocumentOutputSchema = z.object({
  text: z.string().describe('The extracted text from the document.'),
});
export type ExtractTextFromDocumentOutput = z.infer<typeof ExtractTextFromDocumentOutputSchema>;

export async function extractTextFromDocument(
  input: ExtractTextFromDocumentInput
): Promise<ExtractTextFromDocumentOutput> {
  return extractTextFromDocumentFlow(input);
}

const extractTextFromDocumentFlow = ai.defineFlow(
  {
    name: 'extractTextFromDocumentFlow',
    inputSchema: ExtractTextFromDocumentInputSchema,
    outputSchema: ExtractTextFromDocumentOutputSchema,
  },
  async ({ documentDataUri }) => {
    const [header, base64Data] = documentDataUri.split(',');
    if (!header || !base64Data) {
      throw new Error('Invalid data URI format.');
    }
    const mimeType = header.match(/data:(.*);base64/)?.[1];
    if (!mimeType) {
      throw new Error('Could not determine MIME type from data URI.');
    }

    const buffer = Buffer.from(base64Data, 'base64');
    let text: string;

    if (mimeType.startsWith('image/')) {
      const { text: ocrText } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: [
          { text: 'Extract text from this image.' },
          { media: { url: documentDataUri } },
        ],
      });
      if (!ocrText) {
        throw new Error('OCR failed to extract text from the image.');
      }
      text = ocrText;
    } else if (mimeType === 'application/pdf') {
      const pdfParser = new PDFParser(null, true);
      const pdfData = await new Promise<any>((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', (errData: any) => reject(errData.parserError));
        pdfParser.on('pdfParser_dataReady', resolve);
        pdfParser.parseBuffer(buffer);
      });
      text = pdfData.Pages.map((page: any) =>
        page.Texts.map((t: any) => decodeURIComponent(t.R[0].T)).join(' ')
      ).join('\n\n');
    } else {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    return { text };
  }
);
