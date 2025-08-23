'use server';

import { extractAndVerifyLinks, ExtractAndVerifyLinksOutput } from '@/ai/flows/extract-and-verify-links';
import { z } from 'zod';

const formSchema = z.object({
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(2000, {
    message: "Message must not be longer than 2000 characters.",
  }),
});

interface VerifyMessageState {
  data: ExtractAndVerifyLinksOutput | null;
  error: string | null;
}

export async function verifyMessageAction(
  prevState: VerifyMessageState,
  formData: FormData
): Promise<VerifyMessageState> {
  const validatedFields = formSchema.safeParse({
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.message?.[0] || "Invalid input.",
    };
  }

  try {
    const result = await extractAndVerifyLinks({ message: validatedFields.data.message });
    if (result.length === 0) {
      return { data: null, error: "No links found in the provided message. Please try again with a message that contains at least one URL." };
    }
    return { data: result, error: null };
  } catch (error) {
    console.error("Error verifying links:", error);
    return { data: null, error: "An unexpected error occurred. Please try again later." };
  }
}
