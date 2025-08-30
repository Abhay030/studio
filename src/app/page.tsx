"use client";

import { useState } from "react";
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content";
import { analyzeContent } from "@/ai/flows/analyze-content";
import { AppLayout } from "@/components/app-layout";
import { Uploader } from "@/components/uploader";
import { AnalysisView } from "@/components/analysis-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { extractText } from "@/lib/file-extraction";

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
      const extractedText = await extractText(file);
      setOriginalText(extractedText);

      const result = await analyzeContent({ content: extractedText });
      
      if (!result || !result.claritySuggestions) {
        throw new Error("Analysis failed to return a valid result.");
      }

      setAnalysisResult(result);
    } catch (e: any) {
      console.error(e);
      const description = e.message.includes('OCR') 
        ? "The OCR service may be temporarily unavailable or the image could not be processed. Please try another image."
        : "The AI service may be temporarily unavailable. Please try again later.";
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description,
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
