import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from './profile.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario (opcional)',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico único del usuario (opcional)',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 30,
    description: 'Edad del usuario (opcional)',
    required: false,
  })
  age?: number;

  @ApiProperty({
    type: ProfileDto,
    description: 'Datos del perfil del usuario (opcional)',
    required: false,
  })
  profile?: ProfileDto;
}
