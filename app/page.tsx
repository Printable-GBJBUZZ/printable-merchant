import MainDashBoard from "@/Components/MainDashboard";
import NavBar from "@/Components/NavBar/NavBar";
import Image from "next/image";
import { Main } from "next/document";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#E6E6ED] flex">
      {/* left panel */}
      <div className="w-[305px] h-[96%] bg-white rounded-md m-[15px]"></div>

      <div className="flex flex-col w-full mr-5">
        {/* nav bar */}
        <NavBar />

        {/* Dashboard title */}
        <div className="flex flex-row justify-between items-center mb-[7px]">
          <h1 className="text-2xl text-black flex items-center font-inter font-bold">
            Messages
          </h1>
          <div>
            <span className="text-base text-gray-400 font-roboto font-normal hover:cursor-pointer hover:text-gray-600">
              Dashboard /
            </span>
            <span className="text-base text-blue-500 font-roboto font-normal hover:cursor-pointer hover:text-blue-700">
              {" "}
              Messages
            </span>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-row rounded-md">
          <MainDashBoard />
        </div>
      </div>
    </div>
  );
}
