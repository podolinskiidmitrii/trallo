import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequiredRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }

  @RequiredRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @RequiredRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
