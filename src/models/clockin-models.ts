import { Adapter } from "./login.model";

export class EmployeeAttendance {
    id!: string;
    clockIn!: string;
    clockOut!: string | null;
    totalHours!: number | null;
    status!: string;
    employeeCode!: string;
    employeeId!: string;
    employeeFirstName!: string;
    employeeLastName!: string;
    employeeFullName!: string;
    date!: string;
}

export class EmployeeAttendanceAdapter implements Adapter<EmployeeAttendance> {
    adapt(data: any): EmployeeAttendance {
        const attendance = new EmployeeAttendance();
        try {
            attendance.id = data?.id;
            attendance.clockIn = data?.clockIn;
            attendance.clockOut = data?.clockOut ?? null;
            attendance.totalHours = data?.totalHours ?? null;
            attendance.status = data?.status;
            attendance.employeeCode = data?.employeeCode;
            attendance.employeeId = data?.employeeId;
            attendance.employeeFirstName = data?.employeeFirstName;
            attendance.employeeLastName = data?.employeeLastName;
            attendance.employeeFullName = data?.employeeFullName;
            attendance.date = data?.date;
        } catch (error) {
            console.log("Error adapting employee attendance data:", error);
        }
        return attendance;
    }
}

