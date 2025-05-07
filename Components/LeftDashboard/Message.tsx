import Image from "next/image";

type MessageProps = {
  sender: string;
  time: string;
  text: string;
  onClick?: () => void;
}

function Message({ sender, time, text, onClick }: MessageProps) {
  return (
    <div
      className="flex flex-row items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <div className="w-[40px] h-[40px] bg-amber-200 rounded-full"></div>
      <div className="flex flex-col ml-4 flex-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-sm text-black text-inter font-bold">{sender}</h1>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-gray-500 truncate text-inter font-normal">
            {text}
          </p>
          <Image
            src="/MerchantChatPage/Done.png"
            alt=""
            width={20}
            height={20}
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Message;
