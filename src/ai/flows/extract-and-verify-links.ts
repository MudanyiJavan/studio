'use server';
/**
 * @fileOverview Extracts links from a text message and verifies their safety.
 *
 * - extractAndVerifyLinks - A function that handles the extraction and verification of links from a text message.
 * - ExtractAndVerifyLinksInput - The input type for the extractAndVerifyLinks function.
 * - ExtractAndVerifyLinksOutput - The return type for the extractAndVerifyLinks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractAndVerifyLinksInputSchema = z.object({
  message: z
    .string()
    .describe('The text message to extract links from, such as a WhatsApp or SMS message.'),
});
export type ExtractAndVerifyLinksInput = z.infer<
  typeof ExtractAndVerifyLinksInputSchema
>;

const LinkSafetyResultSchema = z.enum(['Safe', 'Suspicious', 'Unsafe']);

const ExtractAndVerifyLinksOutputSchema = z.array(
  z.object({
    url: z.string().url().describe('The extracted URL.'),
    safety: LinkSafetyResultSchema.describe('The safety assessment of the URL.'),
    reason: z.string().optional().describe('The reason for the safety assessment, if applicable.'),
  })
);

export type ExtractAndVerifyLinksOutput = z.infer<
  typeof ExtractAndVerifyLinksOutputSchema
>;

export async function extractAndVerifyLinks(
  input: ExtractAndVerifyLinksInput
): Promise<ExtractAndVerifyLinksOutput> {
  return extractAndVerifyLinksFlow(input);
}

const extractLinksPrompt = ai.definePrompt({
  name: 'extractLinksPrompt',
  input: {schema: ExtractAndVerifyLinksInputSchema},
  output: {schema: z.array(z.string().url())},
  prompt: `You are a helpful AI assistant that extracts all valid URLs from a given text message.

  Message: {{{message}}}

  Output the URLs as a JSON array of strings.  If there are no URLs, output an empty array.`,
});

const verifyLinkTool = ai.defineTool({
  name: 'verifyLink',
  description: 'Verifies the safety of a given URL and returns a safety assessment.',
  inputSchema: z.object({
    url: z.string().url().describe('The URL to verify.'),
  }),
  outputSchema: LinkSafetyResultSchema,
},
async (input) => {
  // TODO: Implement actual link verification logic here.
  // This is a placeholder implementation.
  if (input.url.includes('suspicious')) {
    return 'Suspicious';
  } else if (input.url.includes('unsafe')) {
    return 'Unsafe';
  } else {
    return 'Safe';
  }
});

const extractAndVerifyLinksFlow = ai.defineFlow(
  {
    name: 'extractAndVerifyLinksFlow',
    inputSchema: ExtractAndVerifyLinksInputSchema,
    outputSchema: ExtractAndVerifyLinksOutputSchema,
  },
  async input => {
    const {output: extractedLinks} = await extractLinksPrompt(input);

    if (!extractedLinks) {
      return [];
    }

    const verificationResults = await Promise.all(
      extractedLinks.map(async url => {
        const safety = await verifyLinkTool({url});
        return {url, safety};
      })
    );

    return verificationResults.map(result => ({
      url: result.url,
      safety: result.safety,
      reason: `The link was determined to be ${result.safety.toLowerCase()}.`,
    }));
  }
);
