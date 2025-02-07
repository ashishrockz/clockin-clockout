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
 