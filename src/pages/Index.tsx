
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import CaptionDisplay from "@/components/CaptionDisplay";
import { HuggingFaceTokenInput } from "@/components/HuggingFaceTokenInput";
import { generateCaptionForImage } from "@/services/HuggingFaceService";
import { Sparkles, GithubIcon } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    setCaption("");
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    
    try {
      const generatedCaption = await generateCaptionForImage(selectedImage);
      if (generatedCaption) {
        setCaption(generatedCaption);
        toast.success("Caption generated successfully!");
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      toast.error("Failed to generate caption. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-purple to-brand-dark-purple bg-clip-text text-transparent">
            Snap2Caption
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Transform your images into detailed captions with our AI-powered image captioning tool.
          </p>
          
          <div className="flex justify-center mt-4 space-x-4">
            <a 
              href="https://github.com/nishant-ai/Snap2Caption" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon size={16} />
              <span>View on GitHub</span>
            </a>
            <HuggingFaceTokenInput />
          </div>
        </div>

        <div className="space-y-6 w-full max-w-2xl mx-auto">
          <ImageUploader onImageUploaded={handleImageUpload} isProcessing={isProcessing} />
          
          {selectedImage && !isProcessing && (
            <div className="flex justify-center animate-fade-in">
              <Button 
                onClick={handleGenerateCaption} 
                className="gap-2 bg-brand-purple hover:bg-brand-dark-purple"
                disabled={isProcessing}
              >
                <Sparkles size={16} />
                Generate Caption
              </Button>
            </div>
          )}

          {caption && <CaptionDisplay caption={caption} />}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Powered by Hugging Face's Llama API. Created with React, TypeScript, and Tailwind CSS.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
