import NumberofOrdersBlock from "./Blocks/NumberofOrdersBlock";
import CancelledOrdersBlock from "./Blocks/CancelledOrdersBlock";

export default function OrdersSection(){
    return (
      <div className="w-full h-[60%] flex flex-col gap-[13px]">
        {/* number of order */}
        <NumberofOrdersBlock />
        {/* cancelled order */}
        <CancelledOrdersBlock />
      </div>
    );
}