export enum LoginErrors {
    CONST_ERROR_INVALID_PIN = "CONST_ERROR_INVALID_PIN",
    CONST_INVALID_DEVICE = "error_const_invalid_device_id",
    OOPS_SOMETHING_WENR_WRONG = "Oops something went wrong...!",
    UNAUTHORIZED = "Unauthorized",
}
export enum ClockOutError {
    ERROR_INVALID_EMPLOYEE = "ERROR_INVALID_EMPLOYEE",
    ERROR_EMPLOYEE_NOT_CLOCKED_IN = "ERROR_EMPLOYEE_NOT_CLOCKED_IN",
    ERROR_CANNOT_CLOCK_OUT_EMPLOYEE = "ERROR_CANNOT_CLOCK_OUT_EMPLOYEE",
    SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG"
}

export enum DisplayingClockOutError {
    ERROR_INVALID_EMPLOYEE = "Invalid employee. Please try logging in again.",
    ERROR_EMPLOYEE_NOT_CLOCKED_IN = "You are not currently clocked in.",
    ERROR_CANNOT_CLOCK_OUT_EMPLOYEE = "Unable to clock out at this time.",
    SOMETHING_WENT_WRONG = "Something went wrong. Please try again."
}
export enum ClockInErrors {
    ERROR_INVALID_EMPLOYEE = "error_invalid_employee",
    ERROR_EMPLOYEE_ALREADY_CLOCKED_IN = "error_employee_already_clocked_in",
    ERROR_CANNOT_CLOCK_IN_EMPLOYEE = "error_cannot_clock_in_employee",
}

export enum DisplayingClockInError {
    ERROR_INVALID_EMPLOYEE = "You are not a registered employee.",
    ERROR_EMPLOYEE_ALREADY_CLOCKED_IN = "You have already clocked in.",
    ERROR_CANNOT_CLOCK_IN_EMPLOYEE = "We are currently unable to clock you in.",
    SOMETHING_WENT_WRONG = "Something went wrong. Please try again."
}

export enum UserDetailsErrors {
    ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND = "error_employee_attendance_details_not_found",
    ERROR_INVALID_EMPLOYEE = "error_invalid_employee"
}

export enum DisplayingUserDetailsErrors {
    ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND = "Attendance details not found.",
    ERROR_INVALID_EMPLOYEE = "Invalid employee information."
}
