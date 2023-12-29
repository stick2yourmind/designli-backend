import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FetchGet {
  constructor(private readonly httpService: AxiosHttpService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.request<T>({
          baseURL: url,
          method: 'GET',
        }),
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException('unavailable url');
    }
  }
}
