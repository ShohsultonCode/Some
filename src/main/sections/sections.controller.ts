import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';



@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createSectionDto: CreateSectionDto):Promise<Object> {
    return this.sectionsService.create(createSectionDto);
  }


  @Put('update')
  @UseGuards(AdminGuard)
 async update(@Body() updateSectionDto: UpdateSectionDto):Promise<Object> {
    return this.sectionsService.update(updateSectionDto);
  }
}
