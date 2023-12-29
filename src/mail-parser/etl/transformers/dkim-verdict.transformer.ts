import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { IDkimVerdict } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class DkimVerdict implements IDkimVerdict {
  @Expose()
  @IsString()
  status: string;

  constructor(dto: object) {
    const aux = plainToClass(DkimVerdict, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
