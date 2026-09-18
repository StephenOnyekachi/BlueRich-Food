
import { Bot } from "lucide-react";

function AIAssistant() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl transition hover:scale-105 hover:bg-blue-600"
      aria-label="Open AI Assistant"
    >
      <Bot size={25} />
    </button>
  );
}

export default AIAssistant;
