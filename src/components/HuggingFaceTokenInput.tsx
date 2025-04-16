
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { saveHuggingFaceToken, getHuggingFaceToken, clearHuggingFaceToken } from '@/services/HuggingFaceService';

export const HuggingFaceTokenInput = () => {
  const [token, setToken] = useState(getHuggingFaceToken() || '');

  const handleSaveToken = () => {
    if (token.trim()) {
      saveHuggingFaceToken(token.trim());
    }
  };

  const handleClearToken = () => {
    clearHuggingFaceToken();
    setToken('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Configure HF Token
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hugging Face API Token</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="hf-token">Hugging Face API Token</Label>
            <Input
              id="hf-token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your Hugging Face API token"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSaveToken}>Save Token</Button>
            <Button variant="destructive" onClick={handleClearToken}>Clear Token</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
