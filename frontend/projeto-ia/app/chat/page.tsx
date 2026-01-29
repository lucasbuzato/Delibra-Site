"use client";

import { useEffect, useState, useRef } from "react";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import Sidebar from "../components/Sidebar";
import { Message, Conversation } from "../types";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function fetchConversations() {
    const res = await fetch("http://127.0.0.1:8000/conversations");
    const data = await res.json();

    const normalized: Conversation[] = data.map((c: any) => ({
      id: c.conversation_id ?? c.id,
      title: c.title ?? `Conversa ${c.conversation_id ?? c.id}`,
      timestamp: c.timestamp ?? new Date().toISOString(),
    }));

    setConversations(normalized);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversation_id: conversationId,
        message: text,
      }),
    });

    const data = await res.json();

    setConversationId(data.conversation_id);
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: data.response },
    ]);

    await fetchConversations();
    setLoading(false);
  }

  async function loadConversation(id: string) {
    setConversationId(id);
    setLoading(true);

    const res = await fetch(`http://127.0.0.1:8000/conversations/${id}`);
    const data = await res.json();

    setMessages(data.messages ?? data);
    setLoading(false);
  }

  function newConversation() {
    setConversationId(null);
    setMessages([]);
  }

  async function deleteConversation(id: string) {
    await fetch(`http://127.0.0.1:8000/conversations/${id}`, {
      method: "DELETE",
    });

    if (conversationId === id) newConversation();
    fetchConversations();
  }

  async function renameConversation(id: string, newTitle: string) {
    await fetch(`http://127.0.0.1:8000/conversations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    fetchConversations();
  }

  return (
    <div className="flex h-dvh font-sans overflow-hidden">
      {/* Sidebar – visível só no desktop */}
      <Sidebar
        conversations={conversations}
        onSelect={loadConversation}
        onDelete={deleteConversation}
        onRename={renameConversation}
        onNew={newConversation}
      />

      <main className="flex flex-col w-full h-dvh bg-bg">
        {messages.length === 0 ? (
          /* Estado inicial */
          <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4 sm:px-6">
            <p className="text-white text-base sm:text-lg md:text-xl font-light text-center leading-relaxed">
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl block mb-2">
                Ainda não há nenhuma conversa por aqui.
              </span>
              Quando você quiser, é só começar. Pode ser uma dúvida, um
              pensamento solto ou algo que esteja te incomodando agora.
            </p>

            <ChatInput onSend={sendMessage} />
          </div>
        ) : (
          <>
            {/* Mensagens */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4"
            >
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                />
              ))}
              {loading && (
                <p className="text-white text-sm opacity-70">
                  pensando…
                </p>
              )}
            </div>

            {/* Input */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-white/5">
              <ChatInput onSend={sendMessage} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
