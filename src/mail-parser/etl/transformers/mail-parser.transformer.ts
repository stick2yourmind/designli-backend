import { Injectable } from '@nestjs/common';
import { IExtractor } from 'src/mail-parser/interfaces/by-url-extractor.interface';
import { IEmailParseMapped } from 'src/mail-parser/interfaces/email-parse-mapped.interface';
import { MailParserMapper } from 'src/mail-parser/mappers/mail-parser.mapper';

@Injectable()
export class MailParserTransformer {
  constructor() {}

  execute({ attachments }: IExtractor): IEmailParseMapped[] {
    const records = attachments.map((attachment) => attachment.Records[0]);
    const data = new MailParserMapper().mapEntitiesToDto(records);
    return data;
  }
}
