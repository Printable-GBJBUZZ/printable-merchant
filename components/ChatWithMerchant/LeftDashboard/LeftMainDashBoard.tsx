import { useState } from "react";
import Message from "./Message";
import Search from "./Search";
import Filter from "./Filter";

type ConversationPreview = {
  id: string;
  name: string;
  lastMessage?: {
    text: string;
    time: string;
  };
};

type LeftMainDashBoardProps = {
  onSelect: (partnerId: string) => void; // Changed to pass partnerId directly
  conversations: ConversationPreview[];
  selectedPartnerId?: string | null; // Added to track selected conversation
};

function LeftMainDashBoard({
  onSelect,
  conversations,
  selectedPartnerId,
}: LeftMainDashBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const conversationPreviews = conversations.map((convo) => ({
    id: convo.id,
    name: convo.name,
    time: convo.lastMessage?.time || "",
    text: convo.lastMessage?.text || "",
    isSelected: convo.id === selectedPartnerId, // Track if this conversation is selected
  }));

  const filteredConversations = conversationPreviews.filter(
    (preview) =>
      preview.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preview.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[35%] h-full flex flex-col">
      <div className="flex mb-4 gap-4">
        <Search onSearchChange={setSearchQuery} />
      </div>

      <div className="bg-white rounded-[15px] overflow-hidden">
        <div className="h-[99vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scroll-smooth">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((preview) => (
              <Message
                key={preview.id}
                sender={preview.name}
                time={preview.time}
                text={preview.text}
                isSelected={preview.isSelected} // Pass selection state
                onClick={() => onSelect(preview.id)} // Pass partnerId directly
              />
            ))
          ) : (
            <div className="text-center py-4 text-[#555555] text-sm">
              No conversations found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftMainDashBoard;
