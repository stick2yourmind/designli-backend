import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { accessSync, constants } from 'fs';

@ValidatorConstraint({ name: 'isFilePath', async: false })
export class IsFilePathConstraint implements ValidatorConstraintInterface {
  validate(filePath: string) {
    if (typeof filePath !== 'string') {
      return false;
    }

    try {
      // Use fs.accessSync to check if the file path is valid
      accessSync(filePath, constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid file path`;
  }
}

export function IsFilePath(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFilePathConstraint,
    });
  };
}
