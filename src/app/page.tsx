"use client";

import { useState } from "react";
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content";
import { analyzeContent } from "@/ai/flows/analyze-content";
import { AppLayout } from "@/components/app-layout";
import { Uploader } from "@/components/uploader";
import { AnalysisView } from "@/components/analysis-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const MOCK_EXTRACTED_TEXT = `Welcome to the future of content creation! Our new AI-powered tool is designed to revolutionize your workflow. Are you ready to take your content to the next level? Try it now and see the difference. We believe this will change everything for content creators. Learn more on our website.`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setOriginalText(null);
    setFileName(file.name);

    try {
      // In a real app, you'd extract text from the file (PDF or OCR for images).
      // For this demo, we're using mock text and simulating a delay.
      await new Promise(resolve => setTimeout(resolve, 2000));
      const extractedText = `// MOCK EXTRACTION FROM: ${file.name}\n\n${MOCK_EXTRACTED_TEXT}`;
      setOriginalText(extractedText);

      const result = await analyzeContent({ content: extractedText });
      
      if (!result || !result.claritySuggestions) {
        throw new Error("Analysis failed to return a valid result.");
      }

      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "The AI service may be temporarily unavailable. Please try again later.",
      });
      handleReset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setOriginalText(null);
    setFileName(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full max-w-4xl space-y-10 animate-pulse">
          <div className="space-y-3 text-center">
            <Skeleton className="h-12 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      );
    }

    if (analysisResult && originalText) {
      return (
        <AnalysisView
          originalText={originalText}
          analysisResult={analysisResult}
          onReset={handleReset}
          fileName={fileName || 'your document'}
        />
      );
    }

    return <Uploader onFileUpload={handleFileUpload} isLoading={isLoading}/>;
  };

  return (
    <AppLayout>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center pt-8">
          {renderContent()}
        </div>
      </main>
    </AppLayout>
  );
}
