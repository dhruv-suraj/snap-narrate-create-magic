
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageIcon, UploadIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader = ({ onImageUploaded, isProcessing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageUploaded(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-2xl p-6 shadow-md">
      <div
        className={`dropzone min-h-64 flex flex-col items-center justify-center p-6 rounded-md ${
          isDragging ? 'active' : ''
        } ${previewUrl ? 'bg-secondary/50' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="w-full h-full flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 max-w-full object-contain mb-4 rounded-md shadow-sm"
            />
            <p className="text-sm text-muted-foreground mb-4">
              {isProcessing ? "Generating caption..." : "Image uploaded successfully!"}
            </p>
            {!isProcessing && (
              <Button
                onClick={handleButtonClick}
                variant="outline"
                className="mt-2"
                disabled={isProcessing}
              >
                Change Image
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-brand-purple">
              <ImageIcon size={48} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Drag and drop an image here, or click to select a file
            </p>
            <Button
              onClick={handleButtonClick}
              variant="outline"
              className="gap-2"
              disabled={isProcessing}
            >
              <UploadIcon size={16} />
              Select Image
            </Button>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
        disabled={isProcessing}
      />
    </Card>
  );
};

export default ImageUploader;
