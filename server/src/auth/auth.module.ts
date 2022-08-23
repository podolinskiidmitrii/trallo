import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { WorkingPlacesModule } from 'src/working-places/working-places.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: {
        expiresIn: '48h'
      }
    }),
    WorkingPlacesModule
  ],
  exports: [
    AuthService,
    JwtModule
  ]

})
export class AuthModule { }
