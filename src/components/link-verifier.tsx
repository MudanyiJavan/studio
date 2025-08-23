'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { verifyMessageAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { VerificationResults } from '@/components/verification-results';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      Verify Links
    </Button>
  );
}

export function LinkVerifier() {
  const [state, formAction] = useFormState(verifyMessageAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: state.error,
      });
    }
    if (state.data) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="w-full space-y-8">
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle>Message Scanner</CardTitle>
                <CardDescription>Paste a message to extract and verify all links within it.</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={formAction} className="space-y-4">
                <Textarea
                    name="message"
                    placeholder="e.g., Check out this link: http://example.com and also this one: https://suspicious-site.com"
                    className="min-h-[150px] text-base"
                    required
                />
                <SubmitButton />
                </form>
            </CardContent>
        </Card>

        {state.data && (
            <VerificationResults data={state.data} />
        )}
    </div>
  );
}
