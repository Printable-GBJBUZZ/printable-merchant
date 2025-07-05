import Document from "@/icons/DocumentVault/Document";
import Photos from "@/icons/DocumentVault/Photos";
import Videos from "@/icons/DocumentVault/Videos";
import Zip from "@/icons/DocumentVault/Zip";
import Others from "@/icons/DocumentVault/Others";
import FileTypeElement from "./FileTypeElement";

export default function FileTypeBlock() {
  return (
    <div className="w-full flex flex-row gap-[20px] mt-[18px] mb-[15px]">
      <FileTypeElement
        icon={<Document />}
        text="Document"
        quantity={155}
        size="3.1 GB"
      />
      <FileTypeElement
        icon={<Photos />}
        text="Photos"
        quantity={203}
        size="1.1 GB"
      />
      <FileTypeElement
        icon={<Videos />}
        text="Videos"
        quantity={4}
        size="500 MB"
      />
      <FileTypeElement icon={<Zip />} text="Zip" quantity={15} size="51 MB" />
      <FileTypeElement
        icon={<Others />}
        text="Other Files"
        quantity={50}
        size="1.0GB"
      />
    </div>
  );
}
