import { Transform } from 'class-transformer';
import { IsOptional, IsUrl } from 'class-validator';

export class GetMailDataDto {
  @IsOptional()
  @IsUrl()
  @Transform(({ value }) => value?.trim().toLowerCase())
  url: string;

  // TODO!: implement filepath validation
  // @IsOptional()
  // @IsFilePath()
  // @Transform(({ value }) => value?.trim().toLowerCase())
  // filepath: string;
}
