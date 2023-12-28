import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { FetchGet } from 'src/fetch/use-cases/get/get-fetch';

@Injectable()
export class GetMailData {
  constructor(private readonly _fetch: FetchGet) {}

  async byUrl(url: string): Promise<any> {
    const data = await this._fetch.get(url);
    return data;
  }

  async byFilePath(filepath: string): Promise<any> {
    const jsonFile = await fs.readFile(filepath, 'utf8');
    return JSON.parse(jsonFile);
  }
}
