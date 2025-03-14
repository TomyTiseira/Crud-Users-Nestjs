import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { METADATA, PERMISSIONS } from 'src/common/constants';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteUserResponse,
  EmailIsInUseResponse,
  SearchQuery,
  UpdateUserResponse,
  UserAlreadyInactiveResponse,
  UserByIdResponse,
  UserCreatedResponse,
  UserListResponse,
  UserNotFoundResponse,
} from 'src/common/swagger';
import { ForbiddenResponse } from 'src/common/swagger/forbidden.response';

@ApiTags('users')
@Controller('users')
@UseGuards(PermissionsGuard) // Aplica el guard a todos los endpoints del controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @UserCreatedResponse()
  @EmailIsInUseResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios (con filtro opcional)' })
  @SearchQuery()
  @UserListResponse()
  @ForbiddenResponse()
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.READ_USER])
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @UserByIdResponse()
  @UserNotFoundResponse()
  @ForbiddenResponse()
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.READ_USER])
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  @UserNotFoundResponse()
  @EmailIsInUseResponse()
  @UpdateUserResponse()
  @ForbiddenResponse()
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.UPDATE_USER])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @UserNotFoundResponse()
  @UserAlreadyInactiveResponse()
  @DeleteUserResponse()
  @ForbiddenResponse()
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.DELETE_USER])
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
