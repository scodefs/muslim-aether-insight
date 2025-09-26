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

// Dummy AI responses about Islamic topics
const aiResponses = [
  "As-salamu alaykum! I'm here to help you with questions about Islam, Quran, Hadith, and Islamic knowledge. How can I assist you today?",
  "Based on Islamic teachings, the five pillars of Islam are: Shahada (declaration of faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).",
  "The Quran teaches us about compassion, justice, and the importance of seeking knowledge. 'And whoever saves a life, it is as if he has saved all of mankind.' (Quran 5:32)",
  "Islamic ethics emphasize honesty, kindness, and treating others with respect. The Prophet (peace be upon him) said: 'The best of people are those who benefit others.'",
  "In Islamic tradition, seeking knowledge is a lifelong journey. The Prophet (peace be upon him) said: 'Seek knowledge from the cradle to the grave.'",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "As-salamu alaykum! I'm your Muslim AI assistant. I can help you with questions about Islam, Quran, Hadith, Islamic history, and provide guidance based on Islamic teachings. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
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

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4 pt-6">
          <div className="max-w-4xl mx-auto">
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
          </div>
        </ScrollArea>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}