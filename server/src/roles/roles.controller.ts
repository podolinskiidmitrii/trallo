import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':value')
  findByRole(@Param('value') value:string){
    return this.rolesService.findRoleByName(value)
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(id, updateRoleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}
