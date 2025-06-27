import Table from "./Table";
import TableHeader from "./TableHeader";

type TransactionProps = {
    data: {
        date: string;
        orderID: string;
        name: string;
        mail: string;
        amount: string;
        tip: string;
        status: "Completed" | "Pending";
        netpayout: string;
    }[];
}

export default function Transaction({data}: TransactionProps){
    return (
      <div className="w-full overflow-x-auto px-[33px]">
        <TableHeader />
        <Table data={data}/>
      </div>
    );
}