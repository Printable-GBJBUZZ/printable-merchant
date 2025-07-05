import { useState } from "react";
import FolderIcon from "@/icons/DocumentVault/FolderIcon";
import Image from "@/icons/DocumentVault/Image";
import PDF from "@/icons/DocumentVault/PDF";
import DOC from "@/icons/DocumentVault/DOC";
import XLS from "@/icons/DocumentVault/XLS";
import Star from "@/icons/DocumentVault/Star";
import Rename from "@/icons/DocumentVault/Rename";
import DeleteBin from "@/icons/DocumentVault/DeleteBin";

export default function TableList({ data }: { data: any[] }) {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const renderFileIcon = (item: any) => {
    if (item.isFolder) return <FolderIcon />;
    switch (item.icon) {
      case "image":
        return <Image />;
      case "pdf":
        return <PDF />;
      case "word":
        return <DOC />;
      case "excel":
        return <XLS />;
      default:
        return null;
    }
  };

  const handleRenameClick = (item: any) => {
    setSelectedItem(item);
    setRenameValue(item.name);
    setShowRenameModal(true);
  };

  const handleModalClose = () => {
    setShowRenameModal(false);
    setSelectedItem(null);
    setRenameValue("");
  };

  return (
    <>
      <div className="border-t-[2px] border-[#B197FC] rounded-t-[6px] overflow-hidden mt-[30px]">
        <div className="w-full bg-[#EDECF6] flex text-[#222] font-medium text-[16px] h-[48px] items-center px-4">
          <div className="w-[520px]">NAME</div>
          <div className="w-[200px]">TYPE</div>
          <div className="w-[260px]">SIZE</div>
          <div className="w-[240px]">LAST MODIFIED</div>
          <div className="flex-1 flex justify-center">ACTIONS</div>
        </div>
        {data.map((item) => (
          <div
            key={item.name}
            className="w-full flex items-center text-[15px] border-b border-[#EDECF6] h-[56px] px-4 bg-white hover:bg-[#F8F7FB] transition"
          >
            <div className="w-[520px] flex items-center gap-2">
              {renderFileIcon(item)}
              <span>{item.name}</span>
            </div>
            <div className="w-[200px]">{item.type}</div>
            <div className="w-[260px]">{item.size}</div>
            <div className="w-[240px]">{item.modified}</div>
            <div className="flex-1 flex items-center justify-center gap-5">
              <Star />
              <button onClick={() => handleRenameClick(item)}>
                <Rename />
              </button>
              <DeleteBin />
            </div>
          </div>
        ))}
      </div>

      {/* Rename Modal (same as Create Folder) */}
      {showRenameModal && (
        <div
          className="fixed inset-0 bg-black/10 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="w-[600px] h-[257px] bg-white rounded-2xl px-[35px] py-[30px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[530px] h-[197px]">
              <div>
                <h2 className="text-[32px] font-semibold">Rename</h2>
                <input
                  type="text"
                  className="h-[60px] border-[2px] border-[#C9C9C9] rounded-lg px-3 py-2 w-full mt-[25px]"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                />
              </div>
              <div className="flex flex-row-reverse mt-[25px]">
                <button
                  className="border-[1px] border-[#06044B] text-[#06044B] px-4 py-2 rounded-[10px] ml-[18px] hover:bg-[#06044B] hover:text-white transition-all duration-300"
                  onClick={handleModalClose}
                >
                  Rename
                </button>
                <button
                  className="border-[1px] border-[#06044B] text-[#06044B] px-4 py-2 rounded-[10px] hover:bg-[#06044B] hover:text-white transition-all duration-300"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}