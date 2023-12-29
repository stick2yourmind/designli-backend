import { Injectable } from '@nestjs/common';
import { IExtractor } from 'src/mail-parser/interfaces/by-url-extractor.interface';
import { IEmailParseMapped } from 'src/mail-parser/interfaces/email-parse-mapped.interface';
import {
  MailParserMapper,
  validateDto,
} from 'src/mail-parser/mappers/mail-parser.mapper';
import { Record } from './record.transformer';

@Injectable()
export class MailParserTransformer {
  constructor() {}

  async execute({ attachments }: IExtractor): Promise<IEmailParseMapped[]> {
    const records = attachments.map(
      (attachment) => new Record(attachment.Records[0]),
    );
    // validate Record dto
    for (const record of records) {
      await validateDto(record);
    }

    const data = new MailParserMapper().mapEntitiesToDto(records);
    return data;
  }
}
