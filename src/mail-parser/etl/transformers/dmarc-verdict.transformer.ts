import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { IDmarcVerdict } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class DmarcVerdict implements IDmarcVerdict {
  @Expose()
  @IsString()
  status: string;

  constructor(dto: object) {
    const aux = plainToClass(DmarcVerdict, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
