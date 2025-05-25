import Message from "./Message";
import Search from "./Search";
import Filter from "./Filter";
import { useState } from "react";

type MessageType = {
  sender: string;
  time: string;
  text: string;
};

type LeftMainDashBoardProps = {
  onSelect: (index: number) => void;
  conversations: MessageType[][]; 
};

function LeftMainDashBoard({ onSelect, conversations }: LeftMainDashBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get the last message from each conversation
  const conversationPreviews = conversations.map((convo, index) => ({
    sender: convo[0].sender,
    time: convo[convo.length - 1].time,
    text: convo[convo.length - 1].text,
    originalIndex: index
  }));

  const filteredConversations = conversationPreviews.filter((preview) =>
    preview.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    preview.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[35%] h-full flex flex-col">
      {/* Search + Filter */}
      <div className="flex mb-4 gap-4">
        <Search onSearchChange={setSearchQuery} />
        <Filter />
      </div>

      {/* Chat List Container */}
      <div className="bg-white rounded-[15px] overflow-hidden">
        <div className="h-[76.3vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scroll-smooth">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((preview) => (
              <Message
                key={preview.originalIndex}
                sender={preview.sender}
                time={preview.time}
                text={preview.text}
                onClick={() => onSelect(preview.originalIndex)}
              />
            ))
          ) : (
            <div className="text-center py-4 text-[#555555] text-sm">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftMainDashBoard;
