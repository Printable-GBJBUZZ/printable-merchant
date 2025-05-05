import Image from "next/image";
import ChatMessage from "./ChatMessage";
import RightDashBoardHeader from "./RightDashBoardHeader";

type MessageType = {
  sender: string;
  time: string;
  text: string;
};

type RightMainDashBoardProps = {
  data: MessageType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

function RightMainDashBoard({
  data = [], // Add default empty array
  onChange,
  onSubmit,
}: RightMainDashBoardProps) {
  // Add check for data
  if (!data) {
    return (
      <div className="w-2/3 h-[95%] bg-white rounded-[15px] ml-[27px] p-4 flex items-center justify-center">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 h-[97%] bg-white rounded-[15px] ml-[27px] p-4 flex flex-col">
      {/* Header */}
      <RightDashBoardHeader data={data} />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-4">
          {data.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              time={msg.time}
              text={msg.text}
              align={msg.sender === "Me" ? "right" : "left"}
            />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="h-[60px] mt-4 bg-[#F5F5F5] rounded-lg flex items-center px-4 gap-3 border border-[#A1A1A1]">
        <Image
          src="/MerchantChatPage/add.png"
          alt="Emoji"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Image
          src="/MerchantChatPage/link.png"
          alt="Attach"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-transparent outline-none text-gray-700"
          onChange={onChange}
        />
        <Image
          src="/MerchantChatPage/mic.png"
          alt="mic"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Image
          src="/MerchantChatPage/send.png"
          alt="Send"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default RightMainDashBoard;
