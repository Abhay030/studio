"use client";

import { useState, type DragEvent } from "react";
import { UploadCloud, LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface UploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export function Uploader({ onFileUpload, isLoading }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0 && !isLoading) {
      onFileUpload(files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl lg:text-5xl">
        Unlock Your Content's Potential
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Upload your document to receive AI-powered suggestions for boosting engagement.
      </p>

      <Card
        className={`mt-10 w-full transition-all duration-300 ${isDragging ? "border-primary ring-2 ring-primary" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="grid w-full items-center gap-4">
            <div className={`flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 transition-colors ${isLoading ? 'cursor-not-allowed bg-muted/50' : ''}`}>
              {isLoading ? (
                  <LoaderCircle className="h-12 w-12 text-muted-foreground animate-spin" />
              ) : (
                  <UploadCloud className="h-12 w-12 text-muted-foreground" />
              )}
              <div className="flex flex-col items-center text-center">
                <p className="text-lg font-semibold">{isLoading ? 'Analyzing...' : 'Drag & drop your file here'}</p>
                <p className="text-sm text-muted-foreground">{isLoading ? 'Please wait while we work our magic.' : 'PDF or Image files are supported'}</p>
                <Label htmlFor="file-upload" className="mt-4">
                    <Button asChild variant="outline" disabled={isLoading}>
                        <span>Or browse files</span>
                    </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => handleFileChange(e.target.files)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
