import { IsEmail, IsInt, IsString, ValidateNested } from 'class-validator';
import { ProfileDto } from './profile.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;

  @ValidateNested({ each: true })
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
