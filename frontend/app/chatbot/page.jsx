"use client";
import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getChatConversations, sendChatMessage } from "@/lib/api";
import { Bot, Send, Sparkles, User, Loader2, BookOpen, Brain, Lightbulb, History, Plus, } from "lucide-react";
import { cn } from "@/lib/utils";
const quickActions = [
    { icon: <BookOpen className="h-4 w-4"/>, label: "Explain a concept" },
    { icon: <Brain className="h-4 w-4"/>, label: "Quiz me" },
    { icon: <Lightbulb className="h-4 w-4"/>, label: "Study tips" },
];
export default function ChatbotPage() {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI learning assistant. I'm here to help you with your studies. I can:\n\n- **Explain concepts** from your courses\n- **Quiz you** on topics to test your knowledge\n- **Provide study tips** and learning strategies\n- **Answer questions** about assignments\n\nWhat would you like help with today?",
            timestamp: new Date(),
        },
    ]);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        getChatConversations()
            .then((data) => setConversations(data.conversations))
            .catch(() => setConversations([]));
    }, []);
    const handleSend = async () => {
        if (!inputValue.trim() || isLoading)
            return;
        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);
        try {
            const assistantMessage = await sendChatMessage(inputValue);
            setMessages((prev) => [...prev, {
                    ...assistantMessage,
                    timestamp: new Date(assistantMessage.timestamp),
                }]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleQuickAction = (action) => {
        setInputValue(action);
    };
    return (<DashboardLayout role="student">
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        {/* Sidebar */}
        <Card className="hidden w-72 shrink-0 bg-card border-border lg:flex lg:flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Conversations</CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Plus className="h-4 w-4"/>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {conversations.map((conv) => (<button key={conv.id} className="w-full rounded-lg p-3 text-left transition-colors hover:bg-secondary">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground"/>
                    <span className="font-medium text-foreground truncate">{conv.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{conv.timestamp}</p>
                </button>))}
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="flex flex-1 flex-col bg-card border-border">
          {/* Header */}
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground"/>
              </div>
              <div>
                <CardTitle className="text-foreground">AI Learning Assistant</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse"/>
                  <span className="text-xs text-muted-foreground">
                    Powered by advanced AI - Always ready to help
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.map((message) => (<div key={message.id} className={cn("flex gap-4", message.role === "user" ? "flex-row-reverse" : "")}>
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={message.role === "assistant"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"}>
                      {message.role === "assistant" ? (<Sparkles className="h-5 w-5"/>) : (<User className="h-5 w-5"/>)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn("max-w-[80%] rounded-xl px-4 py-3", message.role === "assistant"
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground")}>
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                    <p className="mt-2 text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
                    </p>
                  </div>
                </div>))}
              {isLoading && (<div className="flex gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5"/>
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>)}
              <div ref={messagesEndRef}/>
            </div>
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (<div className="border-t border-border px-6 py-4">
              <p className="mb-3 text-sm text-muted-foreground">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (<Button key={index} variant="secondary" size="sm" onClick={() => handleQuickAction(action.label)}>
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>))}
              </div>
            </div>)}

          {/* Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={(e) => {
            e.preventDefault();
            handleSend();
        }} className="mx-auto flex max-w-3xl gap-3">
              <Input placeholder="Ask me anything about your courses..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 bg-secondary border-border" disabled={isLoading}/>
              <Button type="submit" disabled={!inputValue.trim() || isLoading}>
                <Send className="mr-2 h-4 w-4"/>
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>);
}
