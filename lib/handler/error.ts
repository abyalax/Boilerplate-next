import { ZodError } from 'zod';

const isDevelopment = process.env.NODE_ENV === 'development';

export class HttpException extends Error {
  status: number;
  trace?: Error;
  errors?: unknown[];

  constructor(status: number, message: string = 'HTTP Exception', trace?: Error) {
    super(message);
    this.errors = undefined;
    this.stack = undefined;
    this.status = status;
    this.trace = isDevelopment ? trace : undefined;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', errors: unknown[] = [], trace?: Error) {
    super(400, message);
    this.stack = undefined;
    this.errors = errors;
    this.trace = trace;
  }
}

export class ZodBadRequestException extends BadRequestException {
  constructor(error: ZodError) {
    super('Validation failed', error.issues);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(404, message);
    this.stack = undefined;
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
    this.stack = undefined;
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(403, message);
    this.stack = undefined;
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict', trace?: Error) {
    super(409, message);
    this.stack = undefined;
    this.trace = trace;
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(message: string = 'Unprocessable Entity', trace?: Error) {
    super(422, message);
    this.stack = undefined;
    this.trace = trace;
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error', trace?: Error) {
    super(500, message);
    this.stack = undefined;
    this.trace = trace;
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string = 'Service Unavailable', trace?: Error) {
    super(503, message);
    this.stack = undefined;
    this.trace = trace;
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string = 'Gateway Timeout', trace?: Error) {
    super(504, message);
    this.stack = undefined;
    this.trace = trace;
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string = 'Too Many Requests', trace?: Error) {
    super(429, message);
    this.stack = undefined;
    this.trace = trace;
  }
}
