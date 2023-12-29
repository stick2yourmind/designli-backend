export interface APIResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
}

export interface ExceptionData {
  errorCode?: string;
  message: any;
}

export class SuccessResponse<T> implements APIResponse<T> {
  status: 'success';
  data?: T;
  constructor(data?: T) {
    this.status = 'success';
    this.data = data;
  }
}
