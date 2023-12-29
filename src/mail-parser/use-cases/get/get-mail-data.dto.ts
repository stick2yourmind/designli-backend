import { Transform } from 'class-transformer';
import { IsOptional, IsUrl } from 'class-validator';
import { IsFilePath } from 'src/common/decorator/is-file-path.decorator';

export class GetMailDataDto {
  @IsOptional()
  @IsUrl()
  @Transform(({ value }) => value?.trim().toLowerCase())
  url: string;

  @IsOptional()
  @IsFilePath()
  @Transform(({ value }) => value?.trim().toLowerCase())
  filepath: string;
}
