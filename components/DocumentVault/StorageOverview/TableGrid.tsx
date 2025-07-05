import GridFolderIcon from "@/icons/DocumentVault/GridFolderIcon";
import Image from "@/icons/DocumentVault/Image";
import PDF from "@/icons/DocumentVault/PDF";
import DOC from "@/icons/DocumentVault/DOC";
import XLS from "@/icons/DocumentVault/XLS";
import Star from "@/icons/DocumentVault/Star";
import Rename from "@/icons/DocumentVault/Rename";
import DeleteBin from "@/icons/DocumentVault/DeleteBin";
import ThreeDots from "@/icons/DocumentVault/ThreeDots";

export default function TableGrid({ data }: { data: any[] }) {
    // Separate folders and files
    const folders = data.filter((item) => item.isFolder);
    const files = data.filter((item) => !item.isFolder);

    // Helper for file icons (same as TableList)
    const renderFileIcon = (item: any) => {
        if (item.isFolder) return <GridFolderIcon />;
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

    return (
        <div className="w-full mt-[30px]">
            {/* Folders Section */}
            {folders.length > 0 && (
                <>
                    <div className="text-[16px] font-semibold mb-2 ml-2">Folders</div>
                    <div className="grid grid-cols-6 gap-6 mb-[30px] mt-[15px]">
                        {folders.map((item) => (
                            <div
                                key={item.name}
                                className="bg-[#F4F4FB] rounded-xl border border-[#EDECF6] flex flex-col p-5 min-w-[170px]"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {renderFileIcon(item)}
                                    <ThreeDots />
                                </div>
                                <div className="font-medium text-[16px] truncate mb-1" >
                                    {item.name}
                                </div>
                                <div className="text-[13px] text-[#888]">
                                    {item.size || "—"}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Files Section */}
            {files.length > 0 && (
                <>
                    <div className="text-[16px] font-semibold mb-2 ml-2">Files</div>
                    <div className="grid grid-cols-6 gap-6 mt-[15px]">
                        {files.map((item) => (
                            <div
                                key={item.name}
                                className="bg-white rounded-xl shadow border border-[#EDECF6] flex flex-col p-5 min-w-[170px]"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {renderFileIcon(item)}
                                </div>
                                <div className="font-medium text-[15px] truncate mb-1">
                                    {item.name}
                                </div>
                                <div className="text-[13px] text-[#888]">
                                    {item.size || "—"}
                                </div>
                                <div className="flex justify-end gap-3 mt-2">
                                    <Star />
                                    <Rename />
                                    <DeleteBin />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}