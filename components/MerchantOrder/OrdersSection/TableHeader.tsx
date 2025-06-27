import TableHeaderElements from "./TableHeaderElements";

export default function TableHeader(){
    return (
      <div className="w-full h-[59px] mt-[49px] flex flex-row justify-around">
        <TableHeaderElements
          name="ORDER ID"
          styles="w-1/8 rounded-tl-[12px] justify-center"
        />
        <TableHeaderElements name="CUSTOMER" styles="w-2/10" />
        <TableHeaderElements name="PRINT JOB TYPE" styles="w-1/7" />
        <TableHeaderElements name="QUANTITY" styles="w-1/8" />
        <TableHeaderElements name="DUE DATE" styles="w-1/7" />
        <TableHeaderElements name="STATUS" styles="w-1/8" />
        <TableHeaderElements name="AMOUNT" styles="w-1/10" />
        <TableHeaderElements name="ACTION" styles="w-1/8 justify-center rounded-tr-[12px]" />
      </div>
    );
}