import { Injectable } from '@nestjs/common';
import { FetchGet } from 'src/fetch/use-cases/get/get-fetch';

@Injectable()
export class GetMailData {
  constructor(private readonly _fetch: FetchGet) {}

  async execute(url: string): Promise<any> {
    const data = await this._fetch.get(url);
    return data;
  }
}
