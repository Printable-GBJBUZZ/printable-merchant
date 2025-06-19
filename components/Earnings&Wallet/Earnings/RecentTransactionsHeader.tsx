import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DownArrow from '@/icons/EarningsWallet/DownArrow';
import Calendar from '@/icons/EarningsWallet/Calender';
import Cross from '@/icons/EarningsWallet/Cross';

export default function RecentTransactionsHeader() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const CustomInput = ({ value, onClick }: any) => (
    <div className="static"> 
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Calendar />
        </div>
        <input
          value={value}
          onClick={onClick}
          readOnly
          className="w-[240px] h-[45px] rounded-[8px] border border-[#DDDDDD] pl-12 pr-10 outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
          <Cross />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="pl-[33px] pt-[26px] text-[20px]">Recent Transactions</div>

      <div className="pt-[24px] w-[680px] h-[45px] flex flex-row gap-[15px] mr-[33px]">
        <div className="relative"> {/* Added wrapper div */}
          <DatePicker
            selectsStart
            startDate={startDate}
            endDate={endDate}
            selected={startDate}
            onChange={(date) => setDateRange([date, endDate])}
            dateFormat="dd/MM/yyyy"
            customInput={<CustomInput />}
            showPopperArrow={false}
            calendarClassName="custom-calendar"
            popperClassName="popper-calendar" 
            popperPlacement="bottom-start"
          />
        </div>

        <div className="relative"> {/* Added wrapper div */}
          <DatePicker
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ?? undefined}
            selected={endDate}
            onChange={(date) => setDateRange([startDate, date])}
            dateFormat="dd/MM/yyyy"
            customInput={<CustomInput />}
            showPopperArrow={false}
            calendarClassName="custom-calendar"
            popperClassName="popper-calendar"
            popperPlacement="bottom-start"
          />
        </div>

        {/* filter */}
        <div className="w-[170px] h-[45px] border-[1px] border-[#C9C9C9] rounded-[10px] flex flex-row justify-between items-center px-[22px]">
          <div className="text-base text-[#555555]">All Status</div>
          <div>
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  );
}