const AssertRecordType =
  <T>() =>
  <D extends Record<string, T>>(d: D) =>
    d;

interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
  status: number;
}

const errorResponse = AssertRecordType<ErrorResponse>()({
  ERR_MISSING_FIELD: {
    error: {
      code: "ERR_MISSING_FIELD",
      message: "Required field(s) is missing.",
    },
    status: 400,
  },
  ERR_INVALID_EMAIL: {
    error: {
      code: "ERR_INVALID_EMAIL",
      message: "Invalid email address format.",
    },
    status: 400,
  },
  ERR_INVALID_PASSWORD: {
    error: {
      code: "ERR_INVALID_PASSWORD",
      message:
        "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character.",
    },
    status: 400,
  },
  ERR_INVALID_CREDENTIALS: {
    error: {
      code: "ERR_INVALID_CREDENTIALS",
      message: "Invalid email or password.",
    },
    status: 401,
  },
  ERR_METHOD_NOT_ALLOWED: {
    error: {
      code: "ERR_METHOD_NOT_ALLOWED",
      message: "The HTTP method is not allowed for this endpoint.",
    },
    status: 405,
  },
  ERR_USER_ALREADY_EXISTS: {
    error: {
      code: "ERR_USER_ALREADY_EXISTS",
      message: "User with this email already exists.",
    },
    status: 409,
  },

  ERR_NOT_AUTHORIZED: {
    error: {
      code: "ERR_NOT_AUTHORIZED",
      message: "You are not authorized to perform this action.",
    },
    status: 403,
  },
  ERR_INTERNAL_SERVER_ERROR: {
    error: {
      code: "ERR_INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
    },
    status: 500,
  },
});

export default errorResponse;
