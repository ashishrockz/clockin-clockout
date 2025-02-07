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