import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role){ }

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto)
  }

  async findAll() {
    return await this.roleRepository.findAll()
  }

  async findByID(id: number) {
    return await this.roleRepository.findByPk(id)
  }

}
