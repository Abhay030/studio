"use client";

import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Smile, ArrowRightCircle } from "lucide-react";


interface AnalysisViewProps {
  originalText: string;
  analysisResult: AnalyzeContentOutput;
  fileName: string;
  onReset: () => void;
}

const suggestionIcons = {
  clarity: <Lightbulb className="h-5 w-5 text-accent" />,
  sentiment: <Smile className="h-5 w-5 text-accent" />,
  callToAction: <ArrowRightCircle className="h-5 w-5 text-accent" />,
};

export function AnalysisView({ originalText, analysisResult, fileName, onReset }: AnalysisViewProps) {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold font-headline">Analysis Complete</h1>
          <p className="text-muted-foreground">
            Suggestions for improving engagement on <span className="font-semibold text-foreground">{fileName}</span>.
          </p>
        </div>
        <Button onClick={onReset}>Analyze Another Document</Button>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Original Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] lg:h-[500px] w-full pr-4">
              <p className="whitespace-pre-wrap text-sm">{originalText}</p>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Engagement Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
             <ScrollArea className="h-[400px] lg:h-[500px] w-full pr-4">
              <Accordion type="multiple" defaultValue={["clarity", "sentiment", "callToAction"]} className="w-full">
                <AccordionItem value="clarity">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      {suggestionIcons.clarity}
                      Clarity
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base prose prose-sm dark:prose-invert">
                    {analysisResult.claritySuggestions}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sentiment">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      {suggestionIcons.sentiment}
                      Sentiment
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base prose prose-sm dark:prose-invert">
                    {analysisResult.sentimentSuggestions}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="callToAction">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      {suggestionIcons.callToAction}
                      Call to Action
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base prose prose-sm dark:prose-invert">
                    {analysisResult.callToActionSuggestions}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
