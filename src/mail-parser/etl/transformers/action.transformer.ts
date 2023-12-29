import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { merge } from 'lodash';
import { IAction } from 'src/mail-parser/interfaces/attachment-data.interface';

@Exclude()
export class Action implements IAction {
  @Expose()
  @IsString()
  topicArn: string;

  @Expose()
  @IsString()
  type: string;

  constructor(dto: object) {
    const aux = plainToClass(Action, dto, {
      excludeExtraneousValues: true,
    });
    merge(this, aux);
  }
}
