import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { CreateUserSectionCompletionDto } from './dto/completion.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionsService } from './sections.service';
import { WalletCheckGuard } from 'src/common/guards/wallet.guard';



@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) { }

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createSectionDto: CreateSectionDto): Promise<Object> {
    return this.sectionsService.create(createSectionDto);
  }


  @Put('update')
  @UseGuards(AdminGuard)
  async update(@Body() updateSectionDto: UpdateSectionDto): Promise<Object> {
    return this.sectionsService.update(updateSectionDto);
  }


  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param("id") id: string): Promise<Object> {
    return this.sectionsService.delete(id);
  }


  @Post('/complete')
  @UseGuards(WalletCheckGuard)
  @UseGuards(JwtAuthGuard)
  async sectionComplete(@Body() body: CreateUserSectionCompletionDto, @Req() req: any): Promise<Object> {
    return this.sectionsService.completeSection(body, req);
  }

  @Get('/my/complete/sections')
  @UseGuards(WalletCheckGuard)
  @UseGuards(JwtAuthGuard)
  async mySectionComplete(@Req() req: any): Promise<Object> {
    return this.sectionsService.myCompleteSection(req);
  }
}
