import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { WorkingPlacesService } from 'src/working-places/working-places.service';

@Injectable()
export class AuthService {

  constructor(
    private UsersService: UsersService,
    private WorkingPlacesService: WorkingPlacesService,
    private jwtService: JwtService,
    private sequelize: Sequelize,
  ) { }

  async login(userDto: LoginUserDto): Promise<User> {
    const user = await this.validateUser(userDto)
    return user
  }

  async registration(CreateUserDto: CreateUserDto) {
    const user = await this.UsersService.getUserByEmail(CreateUserDto.email)
    let token
    if (user) {
      throw new Error(`User with email ${CreateUserDto.email} already exists`)
    }
    const password = await bcript.hash(CreateUserDto.password, 5)
    try {
      await this.sequelize.transaction(async t => {

        const options = { transaction: t }
        const newUser = await this.UsersService.create({ ...CreateUserDto, password }, options)

        const wpCreation = {
          name: `Рабочее пространство - ${newUser.fullname}`,
          owner_id: newUser.id,
        }

        const workingPlace = await this.WorkingPlacesService.create(wpCreation, options)

        await newUser.$set('places', [workingPlace.id], options)
        newUser.places = [workingPlace]
        token = this.generateToken(newUser)
      })
      return token

    } catch (e) {
      console.log(e)
    }
  }

  async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.UsersService.getUserByUsername(userDto.username)
    if (!user) {
      throw new UnauthorizedException({ message: 'Пользователь с таким логином не найден!' })
    }
    const password = await bcript.compare(userDto.password, user.password)
    if (!password) {
      throw new UnauthorizedException({ message: 'Неверный пароль!' })
    }
    return user
  }

  generateToken({ id, email, roles, fullname, username }: User) {
    const payload = { id, email, roles, fullname, username }
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.SECRET_ACCESS_KEY, expiresIn: "1h" }),
      refresh_token: this.jwtService.sign(payload, { secret: process.env.SECRET_REFRESH_KEY, expiresIn: "30d" }),
    }
  }
}
