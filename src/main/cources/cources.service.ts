import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/admin/utilies.service';
import { Category, Course, Section } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { ImageService } from '../image/image.service';
import { CreateCourseDto } from './dto/create-cource.dto';
import { UpdateCourseDto } from './dto/update.category.dto';

@Injectable()
export class CourcesService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
    @InjectModel('Courses') private readonly Courses: Model<Course>,
    @InjectModel('Sections') private readonly Sections: Model<Section>,
    private readonly imageService: ImageService,
    private readonly utilsService: UtilsService,
  ) { }


  async create(body: CreateCourseDto): Promise<Object> {
    const { course_name, course_category, course_description, course_video, course_duration, course_price, course_learns, course_isactive } = body;

    const checkCategory = await this.utilsService.findCategory(course_category);

    if (!checkCategory) {
      throw new BadRequestException('This Category name is already created, Please change name!');
    }

    const courseTemplate = await this.Courses.create({
      course_name: course_name.trim(),
      course_description: course_description.trim(),
      course_category: course_category,
      course_duration: course_duration.trim(),
      course_learns: course_learns,
      course_price: course_price,
      course_video: course_video.trim(),
      course_isactive: course_isactive,
    });

    await courseTemplate.save();

    return { message: 'Success', statusCode: 200 };
  }

  async findAll(): Promise<Object> {
    const courses = await this.Courses.find().populate('course_category').populate('course_sections').exec();
    return { data: courses, message: 'Success', statusCode: 200 };
  }

  async findOne(id: string): Promise<Object> {
    await checkId(id)
    const course = await this.Courses.findById(id).populate('course_category').populate('course_sections').exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return { data: course, message: 'Success', statusCode: 200 };
  }

  async update(body: UpdateCourseDto): Promise<Object> {    
    const {
      course_id,
      course_name,
      course_category,
      course_description,
      course_video,
      course_duration,
      course_price,
      course_learns,
      course_isactive
    } = body;
  
    await checkId(course_id);
    await checkId(course_category);
  
    const checkCategory = await this.Categories.findById(course_category);
  
    if (!checkCategory) {
      throw new BadRequestException('This Category does not exist!');
    }
  
    const courseTemplate = {
      course_name: course_name ? course_name.trim() : course_name,
      course_description: course_description ? course_description.trim() : course_description,
      course_video: course_video ? course_video.trim() : course_video,
      course_duration: course_duration ? course_duration.trim() : course_duration,
      course_price: course_price ? course_price.trim() : course_price,
      course_learns: course_learns ? course_learns : course_learns,
      course_isactive:course_isactive ? course_isactive : course_isactive
    };
  
    const checkNameOfCourse = await this.Courses.findOne({
      course_name: course_name.trim()
    });
  
    if (checkNameOfCourse && checkNameOfCourse._id.toString() !== course_id) {
      throw new BadRequestException('This Course name is already created, Please change the name!');
    }
  
    const updatedCourse = await this.Courses.findByIdAndUpdate(course_id, courseTemplate, { new: true });
  
    if (!updatedCourse) {
      throw new BadRequestException('Course not found');
    }
  
    return { message: 'Success', statusCode: 200};
  }
  
  async remove(id: string): Promise<Object> {
    await checkId(id)
    const deletedCourse = await this.Courses.findByIdAndDelete(id)
    if (!deletedCourse) {
      throw new NotFoundException('Course not found');
    }
    return { message: 'Course deleted successfully', statusCode: 200 };
  }
}
