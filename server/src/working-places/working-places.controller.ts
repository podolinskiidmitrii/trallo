import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkingPlacesService } from './working-places.service';
import { CreateWorkingPlaceDto } from './dto/create-working-place.dto';
import { UpdateWorkingPlaceDto } from './dto/update-working-place.dto';

@Controller('working-places')
export class WorkingPlacesController {
  constructor(private readonly workingPlacesService: WorkingPlacesService) {}

  @Post()
  create(@Body() createWorkingPlaceDto: CreateWorkingPlaceDto) {
    return this.workingPlacesService.create(createWorkingPlaceDto);
  }

  @Get()
  findAll() {
    return this.workingPlacesService.findAll();
  }


}
