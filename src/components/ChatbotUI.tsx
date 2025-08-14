import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Bot as BotIcon, User as UserIcon } from "lucide-react";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import ReactMarkdown from 'react-markdown';
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotUIProps {
  isChatOpen: boolean;
  onChatClose: () => void;
}

// IMPORTANT: Replace with your actual Cloudflare Worker URL
const WORKER_URL = "https://gemini-chat-worker.daivanfebrijuansetiya.workers.dev/"; 
// Or your local dev URL e.g., http://localhost:8787

const ChatbotUI: React.FC<ChatbotUIProps> = ({ isChatOpen, onChatClose }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([
          { id: "greet", text: t('chatbot.greeting'), sender: "bot", timestamp: new Date() }
        ]);
      }
    }
  }, [isChatOpen, t, messages.length]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model', // Gemini uses 'model' for bot
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: trimmedInput, 
          history: chatHistory
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessageId = Date.now().toString();
      let botMessageText = "";

      // Add a placeholder for the bot's message
      setMessages((prev) => [...prev, { id: botMessageId, text: "...", sender: "bot", timestamp: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        // Process Server-Sent Events
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.substring(6));
              if (jsonData.text) {
                botMessageText += jsonData.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId ? { ...msg, text: botMessageText } : msg
                  )
                );
              }
            } catch (parseError) {
              console.warn("Failed to parse JSON from stream:", line, parseError);
            }
          }
        }
      }
      // Final update to ensure the full message is set if it ended mid-stream
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: botMessageText || t('chatbot.errorResponse') } : msg
        )
      );

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: t('chatbot.errorMessage'), sender: "bot", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={onChatClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col h-[80vh] max-h-[700px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center space-x-2">
            <BotIcon className="w-6 h-6 text-primary" />
            <span>{t('chatbot.title')}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end space-x-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><BotIcon size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div className="text-sm prose prose-sm max-w-none text-justify">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap text-justify">{msg.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <Avatar className="w-8 h-8">
                     <AvatarFallback><UserIcon size={18}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length -1]?.sender === 'user' && (
               <div className="flex items-end space-x-2 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><BotIcon size={18}/></AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%] p-3 rounded-lg shadow-sm bg-muted text-muted-foreground">
                    <p className="text-sm animate-pulse">{t('chatbot.typing')}</p>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2 items-center">
            {/* <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
              <Paperclip className="w-5 h-5" />
            </Button> */}
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t('chatbot.placeholder')}
              className="flex-grow"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  handleSendMessage(e as any); // Type assertion for event
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <SendHorizonal className="w-5 h-5" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotUI;
