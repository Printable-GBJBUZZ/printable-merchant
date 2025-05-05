import Image from "next/image";
import { useState } from "react";

type SearchProps = {
  onSearchChange: (query: string) => void;
};

function Search({ onSearchChange }: SearchProps) {
  const [data, setData] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setData(value);
    onSearchChange(value);
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full bg-white rounded-[10px] border border-[#B6B6B6] px-[15px] py-[10px] mr-2">
        <Image
          src="/MerchantChatPage/Search.png"
          alt="Search Icon"
          width={20}
          height={20}
          className="mr-2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-400 text-inter font-normal"
          onChange={handleChange}
          value={data}
        />
      </div>
    </div>
  );
}

export default Search;
