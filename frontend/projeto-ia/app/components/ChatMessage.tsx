export default function ChatMessage({
  role,
  content,
}: {
  role: "user" | "ai";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 whitespace-pre-wrap
          ${
            isUser
              ? "bg-button-red text-white rounded-md"
              : "bg-white text-black rounded-md"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}
