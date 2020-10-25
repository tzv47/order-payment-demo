import { Request } from "express";
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private serviceName: string) {}

  public catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest() as Request;

    const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = (type, message, name?) => {
      response.status(status).json({
        statusCode: status,
        errorType: type,
        errorName: name ?? "Error",
        errorMessage: message ?? [],
        method: request.method,
        path: request.url,
        source: this.serviceName
      });
    };
    console.error(error);
    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (error instanceof HttpException) {
      responseMessage("HttpError", (error as any).response.message, error.message);
    } else {
      responseMessage(error.name, error.message);
      throw error;
    }
  }
}
