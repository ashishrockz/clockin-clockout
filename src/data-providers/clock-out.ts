import { urlConstants } from "../constants";
import { networkInstance } from "./networkInstances";

export const clockOut = async (id:string) => {
    try {
        const url = `${urlConstants?.attendance}/${id}/${urlConstants?.clockOut}`
        const response = await networkInstance.post(url);
        return { success : true,}
    } catch(error : any) {
        return { success : false, message:  error?.error?.errors[0]?.code}
    }
}