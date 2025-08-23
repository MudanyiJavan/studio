import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ShieldAlert, BookCheck, MousePointerClick } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education - VeriLink',
  description: 'Learn how to stay safe online, spot phishing attacks, and identify misinformation.',
};

const educationalTopics = [
    {
        icon: <ShieldAlert className="h-8 w-8 text-primary" />,
        title: "What is Phishing?",
        description: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication."
    },
    {
        icon: <MousePointerClick className="h-8 w-8 text-primary" />,
        title: "How to Spot a Malicious Link",
        description: "Check for spelling errors in the domain name, be wary of shortened URLs, and hover over links to see the actual destination before clicking. Always be cautious of links that create a sense of urgency."
    },
    {
        icon: <BookCheck className="h-8 w-8 text-primary" />,
        title: "Verifying Information Sources",
        description: "Always cross-reference information with multiple reputable sources. Check the 'About Us' section of a website to understand its mission and funding. Be skeptical of anonymous sources."
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: "The Dangers of Misinformation",
        description: "Misinformation can spread rapidly, influencing public opinion, causing social unrest, and even impacting health decisions. Developing critical thinking skills is key to combating its spread."
    }
]

export default function EducationPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Learn to Stay Safe Online</h1>
                <p className="max-w-[700px] mx-auto mt-4 text-foreground/80 md:text-xl">
                    Knowledge is your best defense. Empower yourself with these essential online safety tips.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                {educationalTopics.map((topic, index) => (
                    <Card key={index} className="shadow-md hover:shadow-lg transition-shadow bg-card/80">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {topic.icon}
                            <CardTitle>{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{topic.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
