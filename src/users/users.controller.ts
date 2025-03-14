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

@Controller('users')
@UseGuards(PermissionsGuard) // Aplica el guard a todos los endpoints del controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.READ_USER])
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.READ_USER])
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.UPDATE_USER])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata(METADATA.PERMISSIONS, [PERMISSIONS.DELETE_USER])
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
