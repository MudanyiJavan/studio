import { LinkVerifier } from '@/components/link-verifier';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
            Secure Your Clicks, Instantly
          </h1>
          <p className="max-w-[700px] text-foreground/80 md:text-xl">
            Paste any link or message to check its safety. VeriLink protects you from phishing, scams, and misinformation.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <LinkVerifier />
        </div>
    </div>
  );
}
