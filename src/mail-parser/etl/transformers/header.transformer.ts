import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { IHeader } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class Header implements IHeader {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  value: string;

  constructor(dto: object) {
    const aux = plainToClass(Header, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
