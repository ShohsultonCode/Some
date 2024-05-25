import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';


@ApiTags('admin-side')
@Controller('admin-side')
export class AdminController {
  constructor(
   private readonly adminService: AdminService,
   ) {}




  // @Post("create/category")
  // // @UseGuards(AuthGuard)
  // @UseGuards(AdminGuard)
  // @UseInterceptors(fileUploadInterceptor('category_image'))
  // async createCategory(@Body() body: CreateCategoryDto,  @Req() req: any,  @UploadedFile() file: UploadedFileInter):Promise<Object> {
  //   return this.adminCategoryService.createCategory(req, body, file);
  // }
 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
