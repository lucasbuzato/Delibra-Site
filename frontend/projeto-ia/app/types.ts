export type Message = {
  role: "user" | "ai";
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
  timestamp?: string; // opcional para não quebrar o frontend
};