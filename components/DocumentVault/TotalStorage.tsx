import TotalStorageIcon from "@/icons/DocumentVault/TotalStorageIcon"
export default function TotalStorage(){
    return (
      <div className="w-full h-[143px] rounded-lg bg-white p-[22px]">
        {/* total storage */}
        <div className="w-full flex flex-row justify-between">
          {/* left total storge icon */}
          <div className="flex flex-row">
            <div className="w-[54px] h-[54px] flex justify-center items-center">
              <TotalStorageIcon />
            </div>
            <div className="flex flex-col ml-[15.75px] mt-[2px]">
              <h2 className="text-[20px] font-medium">Total Storage Used</h2>
              <h2 className="text-sm text-[#555555]">
                535 files across all categories
              </h2>
            </div>
          </div>

          {/* total storage used section */}
          <div className="flex flex-col items-end mt-[2px]">
            <div>
              <h2 className="text-[20px] font-bold">4.67 GB</h2>
            </div>
            <div>
              <h2 className="text-[12px] text-[#555555]">of 50 GB used</h2>
            </div>
          </div>
        </div>

        {/* occupied ratio */}
        <div className="w-full h-[15px] flex flex-row mt-[30px]">
          <div className="w-1/5 h-[15px] bg-[#FF9500] rounded-2xl"></div>
          <div className="w-1/5 h-[15px] bg-[#007AFF] rounded-2xl"></div>
          <div className="w-1/5 h-[15px] bg-[#30B0C7] rounded-2xl"></div>
          <div className="w-1/5 h-[15px] bg-[#9747FF] rounded-2xl"></div>
          <div className="w-1/5 h-[15px] bg-[#C9C9C9] rounded-2xl"></div>
        </div>
      </div>
    );
}