import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Ses } from './ses.transformer';
import { merge } from 'lodash';

@Exclude()
export class Record {
  @Expose()
  @IsString()
  eventSource: string;

  @Expose()
  @IsString()
  eventVersion: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Ses)
  ses: Ses;

  constructor(dto: object) {
    const aux = plainToClass(Record, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
