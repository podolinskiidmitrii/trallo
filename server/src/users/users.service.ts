import { Injectable } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private RolesService:RolesService,
  ) { }

  async create(dto: CreateUserDto) {

    const user = await this.userRepository.create<User>(dto);
    const role = await this.RolesService.findRoleByName('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({include:{all:true}})
  }

  async getUserByEmail(email:string){
    return await this.userRepository.findOne({where:{email}, include:{all:true}})
  }

  async findById(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }

}
