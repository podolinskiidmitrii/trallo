import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions, Transaction } from 'sequelize/types';
import { CreateWorkingPlaceDto } from './dto/create-working-place.dto';
import { UpdateWorkingPlaceDto } from './dto/update-working-place.dto';
import { WorkingPlace } from './entities/working-place.entity';

@Injectable()
export class WorkingPlacesService {

  constructor(@InjectModel(WorkingPlace) private readonly workingPlaceRepository: typeof WorkingPlace){ }

  create(createWorkingPlaceDto: CreateWorkingPlaceDto, options:CreateOptions = {}) {
    const CreateOptions = Object.assign(options, {}) 

    return this.workingPlaceRepository.create(createWorkingPlaceDto, CreateOptions);
  }

  findAll() {
    return this.workingPlaceRepository.findAll()
  }

  
}
