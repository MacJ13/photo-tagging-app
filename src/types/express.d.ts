interface FileErrorInfo {
  code: string,
  field: string,
  message: string,
}


declare namespace Express {
  export interface Request {
    fieldValidationError?: Record<string, String[]>;
    fileUploadErrors?: Record<string, FileErrorInfo>
  }

    export interface Response {
      locals: {
        cspNonce?: string;
      }
    }
}

// req.fileUloadError = {code: err.code, field: err.field as string, err}