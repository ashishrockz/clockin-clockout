import { Adapter } from "./login.model";

export class EmployeeAttendance {
    id!: string;
    clockIn?: Date;
    clockOut?: Date;
    totalHours?: number | null;
    status?: string;
    employeeCode!: string;
    employeeId!: string;
    employeeFirstName!: string;
    employeeLastName!: string;
    employeeFullName!: string;
    date!: Date;
}

export enum UserStatus {
  CLOCKED_IN = "clocked_in",
  CLOCKED_OUT = "clocked_out",
}
export class EmployeeAttendanceAdapter implements Adapter<EmployeeAttendance> {
    adapt(data: any): EmployeeAttendance {
        const attendance = new EmployeeAttendance();
        try {
            attendance.id = data?.id;
            attendance.clockIn = new Date(data?.clockIn);
            attendance.clockOut = new Date(data?.clockOut);
            attendance.totalHours = data?.totalHours;
            attendance.status = data?.status;
            attendance.employeeCode = data?.employeeCode;
            attendance.employeeId = data?.employeeId;
            attendance.employeeFirstName = data?.employeeFirstName;
            attendance.employeeLastName = data?.employeeLastName;
            attendance.employeeFullName = data?.employeeFullName;
            attendance.date = new Date(data?.date);
        } catch (error) {
            console.log("Error adapting employee attendance data:", error);
        }
        return attendance;
    }
}

