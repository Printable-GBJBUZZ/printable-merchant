import StatsCardSection from "./StatsCardSection";
import OrdersSection from "./OrdersSection/OrdersSection";

export default function MerchantOrderMain(){
    return (
      <div className="w-full h-full ">
        {/* heading */}
        <h1 className="text-[28px] font-medium mb-[15px]">Orders </h1>

        {/* stats */}
        <StatsCardSection />

        {/* orders section */}
        <OrdersSection /> 
      </div>
    );
}