import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ISes } from 'src/mail-parser/interfaces/attachment-data.interface';
import { Receipt } from './receipt.transformer';
import { Mail } from './mail.transformer';
import { merge } from 'lodash';

@Exclude()
export class Ses implements ISes {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Mail)
  mail: Mail;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Receipt)
  receipt: Receipt;

  constructor(dto: object) {
    const aux = plainToClass(Ses, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
