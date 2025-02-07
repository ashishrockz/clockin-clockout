import { useState } from "react";
import DateTime from "./datetime";
import { useAuth } from "../context/AuthContext";
import { clockIn } from "../data-providers/clockin";

const ClockIn: React.FC = () => {
    const [apiResponse, setApiResponse] = useState<boolean>(false);

    const { user } = useAuth();

    const submit = async () => {
        const apiResponse = await clockIn(user?.userId)
        if (apiResponse.success) {
            setApiResponse(true);
        }
    }

    if (apiResponse) {
        return (
            <div className="bg-gray-900 text-white h-screen p-5">
                <DateTime />
                <div className="mt-15">
                    <h2 className="font-semibold text-xl mt-3 mb-3">Clocked-in successfully at 2:27</h2>
                    <h5 className="font-semibold text-lg mt-3 mb-3">Have a great day ahead, {user?.firstName} {user?.lastName}</h5>
                    <button className="border border-white w-70 h-10 rounded-sm mt-3 mb-3">Close</button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 text-white h-screen p-5">
            <DateTime />
            <div className="mt-15">
                <h3 className="font-bold text-3xl mt-3 mb-3">Welcome, {user?.firstName} {user?.lastName}</h3>
                <h4 className="font-medium text-lg mt-3 mb-3">Please Clock-in to start your shift</h4>
                <button 
  onClick={() => setApiResponse(true)} 
  className="bg-orange-500 w-100 h-10 rounded-sm mt-3 mb-3"
>
<div className="flex items-center justify-center">
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-timer"
  >
    <line x1="10" x2="14" y1="2" y2="2"/>
    <line x1="12" x2="15" y1="14" y2="11"/>
    <circle cx="12" cy="14" r="8"/>
  </svg>
  <p className="ml-5">Clock-in</p>
</div>
</button>
                <p>Cancel</p>
            </div>
        </div>
    );
};

export default ClockIn;
