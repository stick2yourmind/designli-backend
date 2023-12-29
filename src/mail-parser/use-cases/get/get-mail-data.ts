import { Injectable } from '@nestjs/common';
import { MailParserExtractor } from 'src/mail-parser/etl/mail-parser.extractor';
import { MailParserTransformer } from 'src/mail-parser/etl/transformers/mail-parser.transformer';
import { IEmailParseMapped } from 'src/mail-parser/interfaces/email-parse-mapped.interface';

@Injectable()
export class GetMailData {
  constructor(
    private readonly _extractor: MailParserExtractor,
    private readonly _transformer: MailParserTransformer,
  ) {}

  async byUrl(url: string): Promise<IEmailParseMapped[]> {
    const { attachments } = await this._extractor.byUrl(url);
    const data = this._transformer.execute({ attachments });
    return data;
  }

  async byFilePath(filepath: string): Promise<IEmailParseMapped[]> {
    const { attachments } = await this._extractor.byFilePath(filepath);
    const data = this._transformer.execute({ attachments });
    return data;
  }
}
