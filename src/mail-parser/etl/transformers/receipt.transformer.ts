import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IReceipt } from 'src/mail-parser/interfaces/attachment-data.interface';
import { SpamVerdict } from './spam-verdict.transformer';
import { SpfVerdict } from './spf-verdict.transformer';
import { VirusVerdict } from './virus-verdict.transformer';
import { DmarcVerdict } from './dmarc-verdict.transformer';
import { Action } from './action.transformer';
import { DkimVerdict } from './dkim-verdict.transformer';
import { merge } from 'lodash';

@Exclude()
export class Receipt implements IReceipt {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Action)
  action: Action;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => DkimVerdict)
  dkimVerdict: DkimVerdict;

  @Expose()
  @IsString()
  dmarcPolicy: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => DmarcVerdict)
  dmarcVerdict: DmarcVerdict;

  @Expose()
  @IsNumber()
  processingTimeMillis: number;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => SpamVerdict)
  spamVerdict: SpamVerdict;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => SpfVerdict)
  spfVerdict: SpfVerdict;

  @Expose()
  @IsString()
  timestamp: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => VirusVerdict)
  virusVerdict: VirusVerdict;

  constructor(dto: object) {
    const aux = plainToClass(Receipt, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
