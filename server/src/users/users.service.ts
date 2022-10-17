import { Injectable } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { CreateOptions, Transaction } from 'sequelize/types';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private RolesService: RolesService,
    private sequelize: Sequelize
  ) { }

  // async create2(dto: CreateUserDto) {
  //   try {
  //     await this.sequelize.transaction(async t => {
  //       const transactionHost = { transaction: t };
  //       await this.userRepository.create(
  //           dto,
  //           transactionHost,
  //       );

  //     });
  //   } catch (err) {
  //     // Транзакция была отклонена
  //     // err - это то, что отклонила цепочка промисов, возвращенная в обратный вызов транзакции
  //   }
  // }

  async create(dto: CreateUserDto, options: CreateOptions = {}) {

    const CreateOptions = Object.assign(options, {})

    const user = await this.userRepository.create<User>(dto, CreateOptions);
    const role = await this.RolesService.findRoleByName('USER');
    await user.$set('roles', [role.id], CreateOptions);

    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } })
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username }, include: { all: true } })
  }

  async findById(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }

}
