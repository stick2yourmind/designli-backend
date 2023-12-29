import { Injectable } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FetchGet {
  constructor(private readonly httpService: AxiosHttpService) {}

  async get<T>(url: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.request<any>({
        baseURL: url,
        method: 'GET',
      }),
    );
    return response.data;
  }
}
