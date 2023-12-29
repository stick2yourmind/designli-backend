import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { GetMailData } from './use-cases/get/get-mail-data';
import { GetMailDataDto } from './use-cases/get/get-mail-data.dto';
import { NotEmptyBodyPipe } from 'src/common/pipe/not-empty-body.pipe';
import { SuccessResponse } from 'src/tools/success-response.mapper';

@Controller('mail-parser')
export class MailParserController {
  constructor(private readonly _getMailData: GetMailData) {}

  @Post()
  @UsePipes(NotEmptyBodyPipe)
  async getMailData(@Body() { url, filepath }: GetMailDataDto): Promise<any> {
    if (url) {
      const data = await this._getMailData.byUrl(url);
      return new SuccessResponse(data);
    }
    const data = await this._getMailData.byFilePath(filepath);
    return new SuccessResponse(data);
  }
}
