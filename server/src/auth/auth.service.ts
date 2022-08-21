import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private UsersService:UsersService,
    private jwtService:JwtService
    ){}

  async login(userDto:CreateUserDto) {

    const user = await this.validateUser(userDto)
    if(user) return this.generateToken(user)
    
  }

  async registration(CreateUserDto: CreateUserDto) {
    const user = await this.UsersService.getUserByEmail(CreateUserDto.email)
    if(user){
      throw new Error(`User with email ${CreateUserDto.email} already exists`)
    }
    const password = await bcript.hash(CreateUserDto.password, 5)
    const newUser = await this.UsersService.create({...CreateUserDto, password})
    return this.generateToken(newUser)

  }

  async validateUser(userDto:CreateUserDto):Promise<User>{
    const user = await this.UsersService.getUserByEmail(userDto.email)
    const password = await bcript.compare(userDto.password, user.password)
    if(user && password){
      return user
    }
    throw new UnauthorizedException({message:'Неверный пароль!'})
  }

  generateToken({id, email, roles, fullname, username}:User){
    const payload = {id, email, roles, fullname, username}
    return {
      token:this.jwtService.sign(payload)
    }
  }
}
