import GreenDoubleTick from "@/icons/ChatWithCustomers/GreenDoubleTick";
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
      <div className="flex items-center gap-2 mb-[12px]">
        <span className="text-[#354FEB] text-[15px]">{sender}</span>
      </div>
      <div className={`max-w-[70%] rounded-lg mb-[12px]`}>
        <p className="text-black text-[15px]">{text}</p>
      </div>
      <div className="flex flex-row gap-[10px]">
        <span className="text-[#A1A1A1] text-[15px]">{time}</span>
        {align == "right" ? <GreenDoubleTick /> : ""}
      </div>
    </div>
  );
}
export default ChatMessage;
