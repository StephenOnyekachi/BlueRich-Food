
// 

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Clock3,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Utensils,
} from "lucide-react";

function AIChat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm your restaurant assistant. I can help you discover meals, check prices, and find something you'll love.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "ai",
        text: "Thanks for your message! I'm currently being connected to the restaurant menu. Soon I'll be able to recommend meals and provide their current prices.",
      },
    ]);

    setMessage("");
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">

      {/* =========================
          AI CHAT PAGE
      ========================== */}

      <div className="flex min-h-[calc(100vh-80px)]">

        {/* =========================
            DESKTOP LEFT SIDEBAR
        ========================== */}

        <aside className="hidden w-[320px] shrink-0 flex-col border-r border-white/10 bg-slate-950 lg:flex">

          {/* Logo */}
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500">
              <Utensils size={22} />
            </div>

            <div>
              <h1 className="font-bold tracking-wide">
                BLUERICH
              </h1>

              <p className="text-[10px] tracking-wider text-slate-500">
                BAKERY & RESTAURANT
              </p>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 px-6 py-8">

            {/* Assistant */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Sparkles
                  size={22}
                  className="text-green-400"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Restaurant Assistant
                </h2>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-xs text-green-400">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm leading-6 text-slate-400">
              I'm here to help you explore our menu and find
              something delicious.
            </p>

            {/* Suggestions */}
            <div className="mt-10">

              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Try asking
              </p>

              <div className="space-y-3">

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What meals do you recommend?"
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                >
                  <Utensils
                    size={17}
                    className="text-green-400"
                  />

                  <span>
                    What meals do you recommend?
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What meals are available today?"
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                >
                  <Clock3
                    size={17}
                    className="text-green-400"
                  />

                  <span>
                    What's available today?
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What are your most popular meals?"
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                >
                  <Sparkles
                    size={17}
                    className="text-green-400"
                  />

                  <span>
                    What are your popular meals?
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="border-t border-white/10 p-6">

            <div className="space-y-4 text-sm text-slate-400">

              <div className="flex items-center gap-3">
                <MapPin size={17} />
                <span>Visit our restaurant</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle size={17} />
                <span>Pre-order via WhatsApp</span>
              </div>

            </div>

          </div>
        </aside>

        {/* =========================
            MAIN CHAT
        ========================== */}

        <section className="flex min-w-0 flex-1 flex-col bg-slate-900">

          {/* Chat Header */}
          <header className="flex h-20 shrink-0 items-center border-b border-white/10 bg-slate-950 px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <Bot size={21} />
              </div>

              <div>
                <h2 className="text-sm font-semibold sm:text-base">
                  Restaurant Assistant
                </h2>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <span className="text-xs text-green-400">
                    Online
                  </span>
                </div>
              </div>

            </div>
          </header>

          {/* =========================
              MESSAGES
          ========================== */}

          <div className="flex-1 overflow-y-auto">

            <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

              {/* Welcome */}
              <div className="mb-10 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10">
                  <Sparkles
                    size={28}
                    className="text-green-400"
                  />
                </div>

                <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
                  How can I help you?
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Ask me about our meals, prices, recommendations,
                  or anything else about the restaurant.
                </p>

              </div>

              {/* Messages */}
              <div className="space-y-6">

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`flex max-w-[85%] gap-3 sm:max-w-[70%] ${
                        msg.sender === "user"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >

                      {/* Avatar */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          msg.sender === "user"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      >

                        {msg.sender === "user" ? (
                          <span className="text-xs font-bold">
                            You
                          </span>
                        ) : (
                          <Bot size={18} />
                        )}

                      </div>

                      {/* Message */}
                      <div>

                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                            msg.sender === "user"
                              ? "rounded-tr-md bg-blue-600 text-white"
                              : "rounded-tl-md bg-slate-800 text-slate-200"
                          }`}
                        >
                          {msg.text}
                        </div>

                        <p
                          className={`mt-1 text-[10px] text-slate-600 ${
                            msg.sender === "user"
                              ? "text-right"
                              : ""
                          }`}
                        >
                          {msg.sender === "user"
                            ? "You"
                            : "Restaurant Assistant"}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

                <div ref={messagesEndRef} />

              </div>

            </div>
          </div>

          {/* =========================
              INPUT AREA
          ========================== */}

          <div className="shrink-0 border-t border-white/10 bg-slate-950">

            <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-8">

              {/* Mobile Suggestions */}
              <div className="mb-3 flex gap-2 overflow-x-auto lg:hidden">

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What meals do you recommend?"
                    )
                  }
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                >
                  Recommended meals
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What is available today?"
                    )
                  }
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                >
                  Available today
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What are your popular meals?"
                    )
                  }
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                >
                  Popular meals
                </button>

              </div>

              {/* Input */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900 p-2 transition focus-within:border-green-500/50">

                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Ask about our menu..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={18} />
                </button>

              </div>

              <p className="mt-2 text-center text-[10px] text-slate-600">
                AI assistant can help you explore the restaurant menu.
              </p>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default AIChat;



