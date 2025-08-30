import { extractTextFromDocument } from "@/ai/flows/extract-text";

/**
 * Converts a File object to a data URI.
 * @param file The file to convert.
 * @returns A promise that resolves with the data URI.
 */
function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


/**
 * Extracts text from a file by converting it to a data URI and
 * calling the text extraction AI flow.
 * @param file The file to extract text from.
 * @returns A promise that resolves with the extracted text.
 */
export async function extractText(file: File): Promise<string> {
  const dataUri = await fileToDataUri(file);
  const result = await extractTextFromDocument({ documentDataUri: dataUri });
  return result.text;
}
