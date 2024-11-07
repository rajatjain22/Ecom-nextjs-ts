class CustomError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;

    // Ensure the instance of CustomError is correctly identified as an instance of Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
