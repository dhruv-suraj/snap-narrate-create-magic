
import { toast } from "sonner";

const API_URL = "https://api-inference.huggingface.co/models/llava-hf/llava-1.5-7b-hf";
const API_KEY = "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";

export async function generateCaptionForImage(image: File): Promise<string> {
  if (!image) {
    toast.error("Please upload an image first");
    return "";
  }

  try {
    const reader = new FileReader();
    
    const imageData: string = await new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (e.target?.result) {
          // Remove the data URL prefix and get just the base64 data
          const base64Data = (e.target.result as string).split(',')[1];
          resolve(base64Data);
        } else {
          reject(new Error("Failed to read image data"));
        }
      };
      reader.onerror = (e) => reject(new Error("Error reading file: " + e));
      reader.readAsDataURL(image);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          image: imageData,
          prompt: "Describe this image in detail."
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate caption");
    }

    const data = await response.json();
    return data[0]?.generated_text || "No caption generated";
  } catch (error) {
    console.error("Error generating caption:", error);
    let errorMessage = "Failed to generate caption";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
    return "";
  }
}
