import { useState, useEffect } from "react";
export const getFormattedTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }).toLowerCase();
};

export const getFormattedDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


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