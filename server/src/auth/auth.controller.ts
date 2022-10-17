import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) res,
  ) {

    const user = await this.authService.login(userDto)
    if (user) {
      const tokens = this.authService.generateToken(user)
      res.cookie('jwt_refresh', tokens.refresh_token, { httpOnly: true });
      res.cookie('jwt', tokens.access_token, { httpOnly: true });

      return {
        result: true
      }
    }
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @Post('/logout')
  logout() {

  }

}
