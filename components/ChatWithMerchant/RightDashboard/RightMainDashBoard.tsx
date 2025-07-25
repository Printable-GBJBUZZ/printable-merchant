  import { useEffect, useRef } from "react";
  import ChatMessage from "./ChatMessage";
  import RightDashBoardHeader from "./RightDashBoardHeader";

  import AddIcon from "@/icons/ChatWithCustomers/AddIcon";
  import AddMedia from "@/icons/ChatWithCustomers/AddMedia";
  import Mic from "@/icons/ChatWithCustomers/Mic";
  import SendButton from "@/icons/ChatWithCustomers/SendButton";

  export type MessageType = {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: string;
    isRead: boolean;
  };

  type ConversationType = {
    id: string;
    name: string;
    lastMessage?: {
      text: string;
      time: string;
    };
  };

  type Props = {
    data: MessageType[];
    currentUserId: string | null;
    message: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    conversation: ConversationType | null;
  };

  export default function RightMainDashBoard({
    data = [],
    currentUserId,
    message,
    onChange,
    onSubmit,
    conversation,
  }: Props) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    if (!conversation) {
      return (
        <div className="w-2/3 h-full bg-white rounded-[15px] ml-[27px] p-4 flex items-center justify-center">
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      );
    }

    return (
      <div className="w-2/3 h-full bg-white rounded-[15px] ml-[27px] pb-4 flex flex-col">
        {/* Header */}
        <RightDashBoardHeader conversation={conversation} />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 mx-[15px] flex flex-col gap-[4px]">
          {data.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <ChatMessage
                key={msg.id}
                sender={isMe ? "Me" : "Them"}
                time={new Date(msg.timestamp ?? Date.now()).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                text={msg.message}
                align={isMe ? "right" : "left"}
              />
            );
          })}
          <div ref={endRef} />
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
            value={message}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />

          <Mic />
          <button onClick={onSubmit}>
            <SendButton />
          </button>
        </div>
      </div>
    );
  }
