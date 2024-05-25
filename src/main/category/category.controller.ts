import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UploadedFileInter from 'src/common/entity/user.entity';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post("create")
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  async createCategory(@Body() body: CreateCategoryDto, @Req() req: any, @UploadedFile() file: UploadedFileInter): Promise<Object> {
    return this.categoryService.createCategory(req, body, file);
  }


  @Get("all")
  async findAll(): Promise<Object> {
    return await this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Object> {
    return this.categoryService.findOne(id);
  }

  @Put('')
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  update(@Body() body: UpdateCategoryDto, @Req() req: any, @UploadedFile() file: UploadedFileInter) {
    return this.categoryService.update(body, req, file);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string): Promise<Object> {
    return this.categoryService.remove(id);
  }
}
