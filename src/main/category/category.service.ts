import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/admin/utilies.service';
import UploadedFileInter, { Category } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { ImageService } from '../image/image.service';
import { CreateCategoryDto } from './dto/category.create.dto';
CreateCategoryDto
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
    private readonly imageService: ImageService,
    private readonly utilsService: UtilsService,
  ) { }

  async createCategory(req: any, body: CreateCategoryDto, file: UploadedFileInter,): Promise<object> {
    const { category_name, category_description, category_isactive } = body

    const categoryCheck = await this.Categories.findOne({
      category_name: category_name.trim(),
    });

    if (categoryCheck) {
      throw new BadRequestException(
        'This Category name is already created, Please change name !',
      );
    }

    if (!file || !file.filename) {
      throw new BadRequestException('Please sesnd Catgory Image !');
    }

    const categoryTemplate = {
      category_name: category_name.trim(),
      category_description: category_name.trim(),
      category_isactive: category_isactive,
      category_image: file.filename
    };

    const newCategory = await this.Categories.create(categoryTemplate);

    const category = await this.Categories.findById(newCategory.id)

    return { message: 'Success', statusCode: 200, data: category };
  }

  async findAllCategories(): Promise<Object> {
    const viewForAdminCategories = await this.Categories.find({ category_isactive: true }).exec()
    return { message: "Success", statusCode: 200, data: viewForAdminCategories }
  }

  async findOne(id: string): Promise<Object> {
    const category = await this.utilsService.findCategory(id)
    return { message: "Success", statusCode: 200, data: category }
  }

  async update(body: UpdateCategoryDto, req: any, file: UploadedFileInter): Promise<Object> {
    const { category_name, category_isactive, category_id, category_description } = body
    await checkId(category_id)
    const findCategory = await this.Categories.findById(category_id);
    if (!findCategory) {
      throw new NotFoundException("Category not found")
    }
    if (file && file.filename) {
      const imageNameToDelete = findCategory.category_image;
      const deleteImage = await this.imageService.deleteImage(imageNameToDelete)
      findCategory.category_image = file.filename
      await findCategory.save()
    }
    const categoryTemplate = {
      category_name: category_name ? category_name : category_name,
      category_description: category_description ? category_description : category_description,
      category_isactive: category_isactive,
    }
    if (category_isactive) {
      const checkNameOfCategory = await this.Categories.findOne({
        category_name: category_name.trim().toLowerCase()
      })

      if (checkNameOfCategory) {
        throw new BadRequestException(
          'This Category name is already created, Please change name !',
        );
      }
    }

    const updatedCategory = await this.Categories.findByIdAndUpdate(category_id, categoryTemplate)
    await updatedCategory.save();

    return { message: "Successfuly Update", statusCode: 200 }
  }

  async remove(id: string): Promise<Object> {
    await checkId(id);
    const findCategoryImg = await this.Categories.findById(id)

    if (findCategoryImg && findCategoryImg.category_image) {
      const deleteImage = await this.imageService.deleteImage(findCategoryImg.category_image)
      const deleteCategory = await this.Categories.findByIdAndDelete(id);
      return { message: "Success", statusCode: 200 };
    }
    throw new NotFoundException("Category not found")
  }
}
