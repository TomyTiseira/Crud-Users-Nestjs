import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    example: 'EMP-123',
    description: 'Código único del perfil',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Empleado',
    description: 'Nombre del perfil',
  })
  @IsString()
  name: string;
}
