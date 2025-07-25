import GreenDoubleTick from "@/icons/ChatWithCustomers/GreenDoubleTick";
import { UserIcon } from "@heroicons/react/24/solid";

type MessageProps = {
  sender: string;
  time: string;
  text: string;
  isSelected?: boolean; 
  onClick?: () => void;
};

function Message({ sender, time, text, onClick }: MessageProps) {
  return (
    <div
      className="flex flex-row items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <UserIcon className="w-10 h-10 text-gray-500" />
      </div>
      <div className="flex flex-col ml-4 flex-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[16px] text-black text-inter font-bold">
            {sender}
          </h1>
          <span className="text-[14px]">{time}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-black truncate text-inter font-normal max-w-[290px]">
            {text}
          </p>
          <GreenDoubleTick />
        </div>
      </div>
    </div>
  );
}

export default Message;
