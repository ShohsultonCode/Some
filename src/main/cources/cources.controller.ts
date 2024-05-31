import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CreateCourseDto } from './dto/create-cource.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { UpdateCourseDto } from './dto/update.category.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { WalletCheckGuard } from 'src/common/guards/wallet.guard';
import { FilterCourseDto } from './dto/filter.course.dto';
import { CompleteCourseDto } from './dto/compl.dto';


@ApiTags('cources')
@Controller('cources')
export class CourcesController {
  constructor(private readonly courcesService: CourcesService) {}

  
  @Post("create")
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() body: CreateCourseDto):Promise<Object> {
    return this.courcesService.create(body);
  }

  @Post("complete")
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async complete(@Req() req: any,  @Body() body: CompleteCourseDto):Promise<Object> {
    return this.courcesService.completeC(req, body);
  }

    
  @Get("filter")
  @ApiResponse({ status: 201, description: 'Courses' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async filter(@Body() body: FilterCourseDto):Promise<Object> {
    return this.courcesService.filterCourse(body);
  }

  @Get("all")
  @ApiResponse({ status: 200, description: 'All cources' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll():Promise<Object> { 
    return this.courcesService.findAll();
  }


  @Get("my")
  @UseGuards(WalletCheckGuard)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'All cources' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findMyCourses(@Req() req:any):Promise<Object> { 
    return this.courcesService.findMyCourses(req);
  }


  @ApiResponse({ status: 200, description: 'Find cource' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Object> {
    return this.courcesService.findOne(id);
  } 
 

  @Put('update')
  @UseGuards(AdminGuard)
  async update(@Body() updateCourceDto: UpdateCourseDto):Promise<Object> {    
    return this.courcesService.update(updateCourceDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string):Promise<Object> {
    return this.courcesService.remove(id);
  }
}
