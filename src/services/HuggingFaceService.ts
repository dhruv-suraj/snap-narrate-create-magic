
import { toast } from "sonner";

const STORAGE_TOKEN_KEY = 'huggingface_api_token';
const DEFAULT_MODEL_ID = 'meta-llama/Meta-Llama-3-8B-Instruct';

export function saveHuggingFaceToken(token: string) {
  localStorage.setItem(STORAGE_TOKEN_KEY, token);
  toast.success("API Token saved successfully");
}

export function getHuggingFaceToken(): string | null {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function clearHuggingFaceToken() {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  toast.info("API Token cleared");
}

export async function generateCaptionForImage(image: File, modelId?: string, customToken?: string): Promise<string> {
  if (!image) {
    toast.error("Please upload an image first");
    return "";
  }

  const apiToken = customToken || getHuggingFaceToken();
  const selectedModelId = modelId || DEFAULT_MODEL_ID;

  if (!apiToken) {
    toast.error("Please provide a Hugging Face API token");
    return "";
  }

  try {
    const reader = new FileReader();
    
    const imageData: string = await new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (e.target?.result) {
          const base64Data = (e.target.result as string).split(',')[1];
          resolve(base64Data);
        } else {
          reject(new Error("Failed to read image data"));
        }
      };
      reader.onerror = (e) => reject(new Error("Error reading file: " + e));
      reader.readAsDataURL(image);
    });

    const response = await fetch(`https://api-inference.huggingface.co/models/${selectedModelId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
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
