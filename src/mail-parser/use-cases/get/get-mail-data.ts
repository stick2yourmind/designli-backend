import { Injectable } from '@nestjs/common';
import { MailParserExtractor } from 'src/mail-parser/etl/mail-parser.extractor';
import { MailParserTransformer } from 'src/mail-parser/etl/transformers/mail-parser.transformer';

@Injectable()
export class GetMailData {
  constructor(
    private readonly _extractor: MailParserExtractor,
    private readonly _transformer: MailParserTransformer,
  ) {}

  async byUrl(url: string): Promise<any> {
    const { attachments } = await this._extractor.byUrl(url);
    const data = this._transformer.execute({ attachments });
    return data;
  }

  async byFilePath(filepath: string): Promise<any> {
    const { attachments } = await this._extractor.byFilePath(filepath);
    const data = this._transformer.execute({ attachments });
    return data;
  }
}
