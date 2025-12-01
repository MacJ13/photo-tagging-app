declare namespace Express {
  export interface Request {
    fieldValidationError?: Record<string, String[]>;
    fileUloadError?: string;
  }
}
