import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserRoles } from 'src/roles/entities/user-roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { WorkingPlacesModule } from 'src/working-places/working-places.module';
import { WorkingPlace } from 'src/working-places/entities/working-place.entity';

@Module({ 
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    WorkingPlacesModule,
    forwardRef(() => AuthModule),
  ],
  exports:[
    UsersService,
    AuthModule
  ]
})
export class UsersModule {}
