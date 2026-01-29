"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPlus,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Conversation } from "../types";

type SidebarProps = {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename?: (id: string, newTitle: string) => void;
  onNew: () => void;
  className?: string;
};

export default function Sidebar({
  conversations,
  onSelect,
  onDelete,
  onRename,
  onNew,
  className = "",
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(search.toLowerCase())
  );

  const groupByDate = (convs: Conversation[]) => {
    const groups: Record<string, Conversation[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    convs.forEach((conv) => {
      const date = new Date(conv.timestamp ?? "").toDateString();
      let label = "Outros dias";
      if (date === today) label = "Hoje";
      else if (date === yesterday) label = "Ontem";

      if (!groups[label]) groups[label] = [];
      groups[label].push(conv);
    });

    return groups;
  };

  const groupedConversations = groupByDate(filteredConversations);

  const capitalizeTitle = (title: string) =>
    title
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-button-red p-3 rounded-lg text-white shadow-lg"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-dvh w-100
          bg-asidechatbg
          flex flex-col justify-between
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${className}
        `}
      >
        {/* HEADER */}
        <div>
          <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <img
                src="./geometric-abstract-logo-symbol-for-a-decision-supp (1).svg"
                alt="Logo"
                className="h-10"
              />
              <span className="text-xl font-semibold text-white">
                Delibra
              </span>
            </div>

            {/* FECHAR MOBILE */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-white text-xl"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* NOVO CHAT + BUSCA */}
          <div className="flex flex-col gap-6 px-6 py-6 border-b border-white/20">
            <button
              onClick={() => {
                onNew();
                setMobileOpen(false);
              }}
              className="bg-button-red py-3 rounded-lg font-semibold text-white shadow-md hover:bg-red-red active:scale-95 transition"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Novo chat
            </button>

            <input
              type="text"
              placeholder="Buscar conversa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white px-4 py-3 rounded-lg text-sm font-semibold text-grey focus:outline-none"
            />
          </div>

          {/* HISTÓRICO */}
          <div className="flex-1 overflow-y-auto py-4">
            {Object.entries(groupedConversations).map(
              ([dateLabel, convs]) => (
                <div key={dateLabel} className="mb-4">
                  <h2 className="text-sm font-semibold text-white/70 px-6 mb-2">
                    {dateLabel}
                  </h2>

                  {convs.map((conv) => (
                    <div
                      key={conv.id}
                      className="mx-3 mb-1 flex justify-between items-center text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
                    >
                      <button
                        onClick={() => {
                          onSelect(conv.id);
                          setMobileOpen(false);
                        }}
                        className="text-left text-sm truncate"
                      >
                        {capitalizeTitle(conv.title)}
                      </button>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setMenuOpen(
                              menuOpen === conv.id ? null : conv.id
                            )
                          }
                          className="p-1 rounded-full hover:bg-white/20"
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>

                        {menuOpen === conv.id && (
                          <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 overflow-hidden">
                            {onRename && (
                              <button
                                className="px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                                onClick={() => {
                                  const newTitle = prompt(
                                    "Novo nome:",
                                    conv.title
                                  );
                                  if (newTitle)
                                    onRename(conv.id, newTitle);
                                  setMenuOpen(null);
                                }}
                              >
                                Renomear
                              </button>
                            )}
                            <button
                              className="px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                              onClick={() => {
                                onDelete(conv.id);
                                setMenuOpen(null);
                              }}
                            >
                              Apagar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {filteredConversations.length === 0 && (
              <p className="text-white/70 text-sm px-6">
                Nenhuma conversa encontrada
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/20 p-6">
          <a
            href="/"
            className="block bg-button-red text-center py-3 rounded-lg font-bold text-white hover:bg-red-red transition"
          >
            Voltar
          </a>
        </div>
      </aside>
    </>
  );
}
