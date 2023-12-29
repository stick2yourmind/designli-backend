import { Injectable } from '@nestjs/common';
import { MailParserExtractor } from 'src/mail-parser/etl/mail-parser.extractor';

@Injectable()
export class GetMailData {
  constructor(private readonly _extractor: MailParserExtractor) {}

  async byUrl(url: string): Promise<any> {
    const { attachments } = await this._extractor.byUrl(url);
    return attachments;
  }

  async byFilePath(filepath: string): Promise<any> {
    const { attachments } = await this._extractor.byFilePath(filepath);
    return attachments;
  }
}
