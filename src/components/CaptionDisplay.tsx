
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface CaptionDisplayProps {
  caption: string;
}

const CaptionDisplay = ({ caption }: CaptionDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      toast.success("Caption copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy caption");
    }
  };

  if (!caption) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl p-6 mt-6 shadow-md animate-slide-up">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Generated Caption</h3>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <CheckIcon size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <CopyIcon size={14} />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <div className="p-4 bg-secondary/50 rounded-md">
          <p className="text-foreground">{caption}</p>
        </div>
      </div>
    </Card>
  );
};

export default CaptionDisplay;
