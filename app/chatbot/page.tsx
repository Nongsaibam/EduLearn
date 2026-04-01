"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Send,
  Sparkles,
  User,
  Loader2,
  BookOpen,
  Brain,
  Lightbulb,
  History,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

const previousConversations: Conversation[] = [
  { id: "1", title: "Calculus Help", lastMessage: "The derivative of...", timestamp: "Today" },
  { id: "2", title: "Physics Problem", lastMessage: "For projectile motion...", timestamp: "Yesterday" },
  { id: "3", title: "Study Tips", lastMessage: "Here are some effective...", timestamp: "Mar 28" },
]

const quickActions = [
  { icon: <BookOpen className="h-4 w-4" />, label: "Explain a concept" },
  { icon: <Brain className="h-4 w-4" />, label: "Quiz me" },
  { icon: <Lightbulb className="h-4 w-4" />, label: "Study tips" },
]

export default function ChatbotPage() {
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI learning assistant. I'm here to help you with your studies. I can:\n\n- **Explain concepts** from your courses\n- **Quiz you** on topics to test your knowledge\n- **Provide study tips** and learning strategies\n- **Answer questions** about assignments\n\nWhat would you like help with today?",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(inputValue),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("quiz") || lowerInput.includes("test")) {
      return "Great! Let's test your knowledge. I'll ask you a question:\n\n**Question:** In calculus, what is the derivative of f(x) = x²?\n\na) 2x\nb) x\nc) 2x²\nd) x²/2\n\nTake your time and let me know your answer!"
    }
    if (lowerInput.includes("explain") || lowerInput.includes("concept")) {
      return "I'd be happy to explain a concept! Which topic from your courses would you like me to explain? Here are some popular ones:\n\n- Derivatives and integrals (Calculus)\n- Newton's laws of motion (Physics)\n- Data structures like trees and graphs (Computer Science)\n- Literary analysis techniques (English)\n\nJust let me know the topic!"
    }
    if (lowerInput.includes("tip") || lowerInput.includes("strategy")) {
      return "Here are some effective study strategies:\n\n1. **Pomodoro Technique**: Study for 25 minutes, then take a 5-minute break\n2. **Active Recall**: Test yourself instead of just re-reading\n3. **Spaced Repetition**: Review material at increasing intervals\n4. **Teach Others**: Explaining concepts reinforces your understanding\n5. **Sleep Well**: Your brain consolidates memories during sleep\n\nWould you like me to elaborate on any of these?"
    }
    if (lowerInput.includes("a") && lowerInput.length < 5) {
      return "Correct! 🎉 The derivative of f(x) = x² is indeed **2x**.\n\nWe use the power rule: d/dx(xⁿ) = n·xⁿ⁻¹\n\nSo for x², we get: 2·x²⁻¹ = 2x\n\nWould you like another question, or shall we explore a different topic?"
    }
    return "That's a great question! Based on your courses, I can help you understand this better. Could you tell me more specifically what aspect you'd like to explore? I can provide explanations, examples, or practice problems."
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

  return (
    <DashboardLayout role="student">
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        {/* Sidebar */}
        <Card className="hidden w-72 shrink-0 bg-card border-border lg:flex lg:flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Conversations</CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {previousConversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full rounded-lg p-3 text-left transition-colors hover:bg-secondary"
                >
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground truncate">{conv.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{conv.timestamp}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="flex flex-1 flex-col bg-card border-border">
          {/* Header */}
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-foreground">AI Learning Assistant</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
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
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback
                      className={
                        message.role === "assistant"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {message.role === "assistant" ? (
                        <Sparkles className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-4 py-3",
                      message.role === "assistant"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                    <p className="mt-2 text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="border-t border-border px-6 py-4">
              <p className="mb-3 text-sm text-muted-foreground">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="mx-auto flex max-w-3xl gap-3"
            >
              <Input
                placeholder="Ask me anything about your courses..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-secondary border-border"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!inputValue.trim() || isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
