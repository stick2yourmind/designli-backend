import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { IVirusVerdict } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class VirusVerdict implements IVirusVerdict {
  @Expose()
  @IsString()
  status: string;

  constructor(dto: object) {
    const aux = plainToClass(VirusVerdict, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
