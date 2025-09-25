import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your Muslim AI assistant..."
          className={cn(
            "min-h-[60px] resize-none rounded-lg border-input pr-12",
            "focus:ring-2 focus:ring-primary focus:border-transparent"
          )}
          disabled={disabled}
        />
        {message.trim() && (
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90"
            disabled={disabled}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
}