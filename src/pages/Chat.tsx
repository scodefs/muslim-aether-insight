import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebhookData } from "@/hooks/useWebhookData";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Webhook URL for sending messages
const WEBHOOK_URL = "https://sudeis21.app.n8n.cloud/webhook-test/a04da8b6-6276-4919-93ed-366962ffcb97";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const webhookData = useWebhookData();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle webhook data and add as AI responses
  useEffect(() => {
    if (webhookData.length > 0) {
      const latestWebhookData = webhookData[webhookData.length - 1];
      const webhookMessage: Message = {
        id: `webhook-${latestWebhookData.id}`,
        content: `📡 Webhook Data Received:\n\n${JSON.stringify(latestWebhookData.data, null, 2)}`,
        sender: "ai",
        timestamp: latestWebhookData.timestamp,
      };
      
      setMessages(prev => {
        // Check if this webhook message already exists
        const exists = prev.some(msg => msg.id === webhookMessage.id);
        if (exists) return prev;
        return [...prev, webhookMessage];
      });
    }
  }, [webhookData]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Send message to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
          user_id: "user_" + Date.now()
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responseData.output || responseData.message || "Message received and processed.",
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to the server. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4 pt-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && !isTyping ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-8">
                  Where should we begin?
                </h1>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex gap-3 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div className="bg-card text-card-foreground border rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}