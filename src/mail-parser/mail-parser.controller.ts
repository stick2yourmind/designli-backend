import { Body, Controller, Post } from '@nestjs/common';
import { GetMailData } from './use-cases/get/get-mail-data';
import { GetMailDataDto } from './use-cases/get/get-mail-data.dto';

@Controller('mail-parser')
export class MailParserController {
  constructor(private readonly _getMailData: GetMailData) {}

  @Post()
  async getMailData(@Body() { url }: GetMailDataDto): Promise<any> {
    try {
      return await this._getMailData.execute(url);
    } catch (error) {
      console.log(
        '🚀 ~ file: mail-parser.controller.ts:14 ~ MailParserController ~ getMailData ~ error:',
        error,
      );
    }
  }
}
