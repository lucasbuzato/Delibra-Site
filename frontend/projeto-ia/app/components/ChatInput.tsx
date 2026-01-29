"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="w-full">
      <div className="bg-button-red max-w-5xl mx-auto p-3 rounded-xl flex gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem"
          className="focus:outline-none flex-1 py-4 px-4 rounded-md bg-white text-black"
        />

        <button
          onClick={handleSend}
          className="p-4 bg-asidechatbg text-white rounded-xl"
        >
          <FontAwesomeIcon className="text-xl" icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
