import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RoleEntity } from '../../role/models';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthday: Date;

  @IsOptional()
  password: string | null;

  @IsOptional()
  role?: RoleEntity | null;
}
