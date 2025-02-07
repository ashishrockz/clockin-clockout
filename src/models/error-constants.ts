export enum LoginErrors {
    CONST_ERROR_INVALID_PIN = "CONST_ERROR_INVALID_PIN",
    CONST_INVALID_DEVICE = "error_const_invalid_device_id",
    OOPS_SOMETHING_WENR_WRONG = "Oops something went wrong...!",
    UNAUTHORIZED = "Unauthorized",
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


export enum ClockOutErrors {
    ERROR_INVALID_EMPLOYEE = "error_invalid_employee",
    ERROR_EMPLOYEE_NOT_CLOCKED_IN = "error_employee_not_clocked_in",
    ERROR_CANNOT_CLOCK_OUT_EMPLOYEE = "error_cannot_clock_out_employee"
}

export enum UserDetailsErrors {
    ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND = "error_employee_attendance_details_not_found",
    ERROR_INVALID_EMPLOYEE = "error_invalid_employee"
}

export enum DisplayingUserDetailsErrors {
    ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND = "Attendance details not found.",
    ERROR_INVALID_EMPLOYEE = "Invalid employee information."
}
