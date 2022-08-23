import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { WorkingPlacesService } from 'src/working-places/working-places.service';
import { CreateWorkingPlaceDto } from 'src/working-places/dto/create-working-place.dto';

@Injectable()
export class AuthService {

  constructor(
    private UsersService:UsersService,
    private WorkingPlacesService:WorkingPlacesService,
    private jwtService:JwtService,
    private sequelize:Sequelize,
    ){ }

  async login(userDto:CreateUserDto) {

    const user = await this.validateUser(userDto)
    if(user) return this.generateToken(user)
    
  }

  async registration(CreateUserDto: CreateUserDto) {
    const user = await this.UsersService.getUserByEmail(CreateUserDto.email)
    let token
    if(user){
      throw new Error(`User with email ${CreateUserDto.email} already exists`)
    }
    const password = await bcript.hash(CreateUserDto.password, 5)
    try{
      await this.sequelize.transaction(async t => {

            const options = {transaction: t}
            const newUser = await this.UsersService.create({...CreateUserDto, password}, options)
            
            const wpCreation = {
              name:`Рабочее пространство - ${newUser.fullname}`,
              owner_id:newUser.id,
            }

            const workingPlace =  await this.WorkingPlacesService.create(wpCreation, options)

            await newUser.$set('places', [workingPlace.id], options)
            newUser.places = [workingPlace]
            token =  this.generateToken(newUser)
        })
    }catch(e){
      console.log(e)
    }
    return token
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
