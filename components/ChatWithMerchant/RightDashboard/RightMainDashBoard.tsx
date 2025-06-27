import ChatMessage from "./ChatMessage";
import RightDashBoardHeader from "./RightDashBoardHeader";
import AddIcon from "@/icons/ChatWithCustomers/AddIcon";
import AddMedia from "@/icons/ChatWithCustomers/AddMedia";
import Mic from "@/icons/ChatWithCustomers/Mic";
import SendButton from "@/icons/ChatWithCustomers/SendButton";

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
      <div className="w-2/3 h-full bg-white rounded-[15px] ml-[27px] p-4 flex items-center justify-center">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 h-full bg-white rounded-[15px] ml-[27px] pb-4 flex flex-col">
      {/* Header */}
      <RightDashBoardHeader data={data} />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 mx-[15px] flex flex-col-reverse">
        <div className="flex flex-col gap-[4px]">
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
      <div className="h-[50px] mt-4 bg-[#F5F5F5] rounded-[15px] flex items-center px-4 gap-3 border border-[#A1A1A1] mx-[15px]">
        <div className="h-[30px] flex flex-row items-center gap-[11px] pr-[12px] border-r-[1.5px] border-[#C9C9C9]">
          <AddIcon />
          <AddMedia />
        </div>
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-transparent outline-none text-gray-700 ml-[30]"
          onChange={onChange}
        />
        <Mic />
        <SendButton />
      </div>
    </div>
  );
}

export default RightMainDashBoard;
