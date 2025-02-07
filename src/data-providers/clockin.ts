import { urlConstants } from "../constants";
import { networkInstance } from "./networkInstances";

export const clockIn = async (id:string) => {
    try {
        const url = `${urlConstants?.attendance}/${id}/${urlConstants?.clockIn}`
        const response = await networkInstance.post(url);
        if(response?.status == 200 || response?.status == 201){
            return { success : true,message : response?.data}
        }
        else{
            return { success:false, message:response?.data}
        }
    } catch(error : any) {
        return { success : false, message:  error?.error?.errors[0]?.code}
    }
}