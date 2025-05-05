type ChatMessageProps = {
  sender: string;
  time: string;
  text: string;
  align?: "left" | "right";
};

function ChatMessage({ sender, time, text, align = "left" }: ChatMessageProps) {
  return (
    <div
      className={`flex flex-col ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#354FEB] text-sm">{sender}</span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          align === "right" ? "bg-blue-50" : "bg-gray-50"
        }`}
      >
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
}
export default ChatMessage;
