import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { FetchGet } from 'src/fetch/use-cases/get/get-fetch';
import { EmailParseData } from '../interfaces/email-parse-data.interface';
import { IAttachmentData } from '../interfaces/attachment-data.interface';

@Injectable()
export class MailParserExtractor {
  constructor(private readonly _fetch: FetchGet) {}

  async byUrl(url: string): Promise<any> {
    const data = await this._fetch.get<EmailParseData[]>(url);
    const attachments: IAttachmentData[] = data.map((emailData) =>
      JSON.parse(emailData.mail_attachments),
    );
    return { attachments };
  }

  async byFilePath(filepath: string): Promise<any> {
    const jsonFile = await fs.readFile(filepath, 'utf8');
    const data: EmailParseData[] = JSON.parse(jsonFile);
    const attachments: IAttachmentData[] = data.map((emailData) =>
      JSON.parse(emailData.mail_attachments),
    );
    return { attachments };
  }
}
