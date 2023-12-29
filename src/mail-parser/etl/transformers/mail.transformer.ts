import { Exclude, Expose, Type, plainToClass } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { IMail } from 'src/mail-parser/interfaces/attachment-data.interface';
import { Header } from './header.transformer';
import { CommonHeaders } from './common-header.transformer';
import { merge } from 'lodash';

@Exclude()
export class Mail implements IMail {
  @Expose()
  @IsString()
  timestamp: string;

  @Expose()
  @IsString()
  source: string;

  @Expose()
  @IsString()
  messageId: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @Expose()
  @IsBoolean()
  headersTruncated: boolean;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Header)
  headers: Header[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommonHeaders)
  commonHeaders: CommonHeaders;

  constructor(dto: object) {
    const aux = plainToClass(Mail, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
