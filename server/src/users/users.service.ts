import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User){ }

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto)
  }

  async getAllUsers(){
    return await this.userRepository.findAll()
  }

  async findById(id: number) {
    return await this.userRepository.findByPk(id)
  }

}
