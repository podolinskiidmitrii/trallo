import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { UserRoles } from './entities/user-roles.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports:[
    SequelizeModule.forFeature([Role, User, UserRoles])
  ], 
  exports:[RolesService]
})
export class RolesModule {}
