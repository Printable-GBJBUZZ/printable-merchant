import TodaysOrderBlock from "./Blocks/TodaysOrderBlock";
import PendingOrdersBlock from "./Blocks/PendingOrdersBlock";
import RevenueBlock from "./Blocks/RevenueBlock";
import AcceptedOrdersBlock from "./Blocks/AcceptedOrdersBlock";

function StatsCardSection(){
    return (
      <div className="w-full h-[180px] flex flex-row justify-between mb-[15px] gap-[15px]">
        <TodaysOrderBlock />
        <PendingOrdersBlock />
        <RevenueBlock />
        <AcceptedOrdersBlock />
      </div>
    );
}

export default StatsCardSection;