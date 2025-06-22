export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}
