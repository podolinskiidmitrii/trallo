import { Module } from '@nestjs/common';
import { WorkingPlacesService } from './working-places.service';
import { WorkingPlacesController } from './working-places.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkingPlace } from './entities/working-place.entity';
import { User } from 'src/users/entities/user.entity';
import { UserPlaces } from 'src/users/entities/user-places.entity';

@Module({
  controllers: [WorkingPlacesController],
  providers: [WorkingPlacesService],
  imports:[
    SequelizeModule.forFeature([WorkingPlace, User, UserPlaces])
  ],
  exports:[WorkingPlacesService]
})
export class WorkingPlacesModule {}
