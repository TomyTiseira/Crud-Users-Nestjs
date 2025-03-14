import { IsEmail, IsInt, IsString, ValidateNested } from 'class-validator';
import { ProfileDto } from './profile.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 30,
    description: 'Edad del usuario',
  })
  @IsInt()
  age: number;

  @ApiProperty({
    type: ProfileDto,
    description: 'Datos del perfil del usuario',
  })
  @ValidateNested({ each: true })
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
