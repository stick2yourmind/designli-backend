import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { merge } from 'lodash';
import { ICommonHeaders } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class CommonHeaders implements ICommonHeaders {
  @Expose()
  @IsString()
  returnPath: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  from: string[];

  @Expose()
  @IsString()
  date: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  to: string[];

  @Expose()
  @IsString()
  messageId: string;

  @Expose()
  @IsString()
  subject: string;

  constructor(dto: object) {
    const aux = plainToClass(CommonHeaders, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
