import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  // IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({})
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  // @IsBoolean()
  @Transform((value) => Number(value))
  isActive: boolean;
}
