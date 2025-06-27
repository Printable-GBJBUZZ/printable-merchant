type TableHeaderProps = {
    name: string,
    styles: string,
}

export default function TableHeaderElements({name,styles}: TableHeaderProps){
    return (
      <div className={`h-[59px] bg-[#E6E6ED] border-b-[1px] border-b-[#C9C9C9] flex items-center ${styles}`}>
        {name}
      </div>
    );
}