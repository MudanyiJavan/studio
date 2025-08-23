'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, XCircle, ShieldQuestion } from 'lucide-react';
import type { ExtractAndVerifyLinksOutput } from '@/ai/flows/extract-and-verify-links';
import { cn } from '@/lib/utils';

type SafetyStatus = 'Safe' | 'Suspicious' | 'Unsafe';

const statusConfig: Record<SafetyStatus | 'Unknown', {
    icon: React.ReactNode;
    text: string;
    cardClass: string;
    textColor: string;
}> = {
    Safe: {
      icon: <CheckCircle2 className="h-6 w-6" />,
      text: 'Safe',
      cardClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    Suspicious: {
      icon: <AlertTriangle className="h-6 w-6" />,
      text: 'Suspicious',
      cardClass: 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    Unsafe: {
      icon: <XCircle className="h-6 w-6" />,
      text: 'Unsafe',
      cardClass: 'border-red-500/50 bg-red-500/10 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
    Unknown: {
      icon: <ShieldQuestion className="h-6 w-6" />,
      text: 'Unknown',
      cardClass: 'border-gray-500/50 bg-gray-500/10 dark:bg-gray-900/20',
      textColor: 'text-gray-600 dark:text-gray-400',
    },
};

export function VerificationResults({ data }: { data: ExtractAndVerifyLinksOutput }) {
    if (!data || data.length === 0) return null;
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-center">Verification Results</h2>
        <div className="grid gap-4">
          {data.map((result, index) => {
            const config = statusConfig[result.safety as SafetyStatus] || statusConfig.Unknown;
            return (
              <Card key={index} className={cn('shadow-sm transition-all hover:shadow-md', config.cardClass)}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={cn('pt-1', config.textColor)}>{config.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold", config.textColor)}>{config.text}</p>
                    <p className="text-sm text-foreground/80 break-words">{result.url}</p>
                    {result.reason && <p className="text-xs text-muted-foreground mt-1">{result.reason}</p>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
