export interface UrlConstants {
  authLogin : string;
  attendance : string;
  clockIn: string;
  clockOut:string;
  details:string;
}

export const urlConstants : UrlConstants = {
    authLogin: "auth/login",
    attendance:"attendance",
    clockIn:"clock-in",
    clockOut:'clock-out',
    details:"details"
}

export interface UserStatus{
  clockedIn:string;
  clockedOut:string
}

export const userStatus:UserStatus = {
  clockedIn : "clocked_in",
  clockedOut : "clocked_out"

}