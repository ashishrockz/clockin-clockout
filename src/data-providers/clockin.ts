import { urlConstants } from "../constants";
import { EmployeeAttendanceAdapter } from "../models/clockin-models";
import { networkInstance } from "./networkInstances";

export const clockIn = async (id:string) => {
    try {
        const url = `${urlConstants?.attendance}/${id}/${urlConstants?.clockIn}`
        const response = await networkInstance.post(url);
        if(response?.status == 200 || response?.status == 201){
            return { success : true,message : response?.data}
        }
        else{
            return { success:false,}
        }
    } catch(error : any) {
        return { success : false, message:  error?.error?.errors[0]?.code}
    }
}

export const getUserDetailsById = async (id: string) => {
    try {
        const url = `${urlConstants.attendance}/${id}/${urlConstants.details}`;
        const response = await networkInstance.post(url);
        
        if (response?.status === 200) {
            const attendanceAdapter = new EmployeeAttendanceAdapter();
            const userData = attendanceAdapter.adapt(response?.data?.data);
            return { success: true, userData: userData };
        } else {
            return { success: false};
        }
    } catch (error: any) {
        return { success: false, message: error?.error?.errors[0]?.code };
    }
};
