import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { ISpamVerdict } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class SpamVerdict implements ISpamVerdict {
  @Expose()
  @IsString()
  status: string;

  constructor(dto: object) {
    const aux = plainToClass(SpamVerdict, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
