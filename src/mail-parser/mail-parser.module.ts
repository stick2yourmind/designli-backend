import { Module } from '@nestjs/common';
import { FetchModule } from 'src/fetch/fetch.module';
import { MailParserController } from './mail-parser.controller';
import { GetMailData } from './use-cases/get/get-mail-data';
import { MailParserExtractor } from './etl/mail-parser.extractor';
import { MailParserTransformer } from './etl/transformers/mail-parser.transformer';

@Module({
  imports: [FetchModule],
  controllers: [MailParserController],
  providers: [MailParserExtractor, MailParserTransformer, GetMailData],
})
export class MailParserModule {}
