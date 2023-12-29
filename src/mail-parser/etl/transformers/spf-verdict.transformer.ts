import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { ISpfVerdict } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class SpfVerdict implements ISpfVerdict {
  @Expose()
  @IsString()
  status: string;

  constructor(dto: object) {
    const aux = plainToClass(SpfVerdict, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
