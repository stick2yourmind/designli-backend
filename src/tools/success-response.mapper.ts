export interface APIResponse<T> {
  status: 'success' | 'error';
  data?: T;
}

export class SuccessResponse<T> implements APIResponse<T> {
  status: 'success';
  data?: T;
  constructor(data?: T) {
    this.status = 'success';
    this.data = data;
  }
}
