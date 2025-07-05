import FileTypeBlock from "./FileTypeBlock";
import StorageOverview from "./StorageOverview/StorageOverview";
import TotalStorage from "./TotalStorage";

export default function Main(){
    return (
      <div className="w-full h-full flex flex-col">
        <div className="w-full text-[28px] font-medium" >Document Vault</div>

        {/* top section cards */}                 
        <FileTypeBlock />

        {/* total storage */}
        <TotalStorage /> 

        {/* storage overview */}
        <StorageOverview />
      </div>
    );
}