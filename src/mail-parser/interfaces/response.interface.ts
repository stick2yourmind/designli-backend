import { SuccessResponse } from 'src/tools/success-response.mapper';
import { IEmailParseMapped } from './email-parse-mapped.interface';

export type IGetMailData = Prettify<
  SuccessResponse<Prettify<IEmailParseMapped>[]>
>;
