import * as dayjs from 'dayjs';
import { EntityDtoMapper } from 'src/tools/entity-dto-mapper';
import { IRecord } from '../interfaces/attachment-data.interface';
import { IEmailParseMapped } from '../interfaces/email-parse-mapped.interface';
import {
  ValidationError,
  ValidatorOptions,
  validateOrReject,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const enum STATUS {
  PASS = 'PASS',
}

export const getAllConstraints = (errors: ValidationError[]): string[] => {
  const constraints: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      const constraintValues = Object.values(error.constraints);
      constraints.push(...constraintValues);
    }

    if (error.children) {
      const childConstraints = getAllConstraints(error.children);
      constraints.push(...childConstraints);
    }
  }

  return constraints;
};

export const validateDto = async (
  input: any,
  options: ValidatorOptions = {
    whitelist: true,
  },
  message?: string,
): Promise<void> => {
  try {
    await validateOrReject(input, options);
  } catch (errors) {
    let errorList = [];
    if (errors instanceof Array) {
      errorList = getAllConstraints(errors);
    }
    throw new BadRequestException(
      message ? [message, ...errorList] : errorList,
    );
  }
};
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
