import { Module } from '@nestjs/common';
import { FetchModule } from 'src/fetch/fetch.module';
import { MailParserController } from './mail-parser.controller';
import { GetMailData } from './use-cases/get/get-mail-data';
import { MailParserExtractor } from './etl/mail-parser.extractor';

@Module({
  imports: [FetchModule],
  controllers: [MailParserController],
  providers: [MailParserExtractor, GetMailData],
})
export class MailParserModule {}
