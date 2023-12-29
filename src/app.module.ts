import { Module } from '@nestjs/common';
import { FetchModule } from './fetch/fetch.module';
import { MailParserModule } from './mail-parser/mail-parser.module';
@Module({
  imports: [FetchModule, MailParserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
