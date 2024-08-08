export class ErrorWithCode extends Error {
  statusCode: number;
  message!: string;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}