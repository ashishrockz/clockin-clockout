import { useState, useEffect } from "react";
import { getFormattedDate, getFormattedTime } from "../global/customDateFormat";

const DateTime: React.FC = () =>{
     const [currentDate, setCurrentDate] = useState<Date>(new Date());
    
      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      const getWeekday = (date: Date) => {
        return date.toLocaleDateString("en-US", {
          weekday: "short",
        });
      };
    return(
        <div className="flex justify-end">
        <div className="flex flex-col justify-end">
          <p>{getFormattedTime(currentDate)}</p>
          <p>{`${getFormattedDate(currentDate)} (${getWeekday(currentDate)})`}</p>
        </div>
      </div>
    )
}

export default DateTime;