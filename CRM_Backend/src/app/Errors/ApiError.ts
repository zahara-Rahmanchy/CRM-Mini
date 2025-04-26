class ApiError extends Error {
    //   statusCode: number;
    error: string;
    statusCode: number;
    constructor(
      statusCode: number,
      message: string = "Something went wrong",
      stack = "",
      error: string ="API Error"
    ) {
      super(message);
      this.statusCode = statusCode;
      this.error = error;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
        console.log(
          " Error.captureStackTrace(this,this.constructor): ",
          Error.captureStackTrace(this, this.constructor)
        );
      }
    }
  }
  
  export default ApiError;
  