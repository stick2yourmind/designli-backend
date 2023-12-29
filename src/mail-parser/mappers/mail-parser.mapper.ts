import * as dayjs from 'dayjs';
import { EntityDtoMapper } from 'src/tools/entity-dto-mapper';
import { IRecord } from '../interfaces/attachment-data.interface';
import { IEmailParseMapped } from '../interfaces/email-parse-mapped.interface';

export const enum STATUS {
  PASS = 'PASS',
}

export class MailParserMapper extends EntityDtoMapper<
  IRecord,
  IEmailParseMapped
> {
  mapEntityToDto(record: IRecord): IEmailParseMapped {
    const dnsStatus = [
      record.ses.receipt.spfVerdict.status,
      record.ses.receipt.dkimVerdict.status,
      record.ses.receipt.dmarcVerdict.status,
    ];
    const parsedDate = dayjs(record.ses.mail.timestamp);
    const monthString = parsedDate.format('MMMM');
    return {
      spam: record.ses.receipt.spamVerdict.status === STATUS.PASS,
      virus: record.ses.receipt.virusVerdict.status === STATUS.PASS,
      dns: !dnsStatus.some((status) => status !== STATUS.PASS),
      mes: monthString,
      retrasado: record.ses.receipt.processingTimeMillis > 1000,
      emisor: record.ses.mail.source.split('@')[0],
      receptor: record.ses.mail.destination.map(
        (destination) => destination.split('@')[0],
      ),
    };
  }
}
