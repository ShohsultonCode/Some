import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/common/entity/user.entity';
import { Section } from './entities/section.entity';
import { Model } from 'mongoose';
import { checkId } from 'src/utils/check.id';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel('Courses') private readonly Courses: Model<Course>,
    @InjectModel('Sections') private readonly Sections: Model<Section>,
  ) { }

  
  async create(createSectionDto: CreateSectionDto): Promise<Object> {
    const { cc_course_id, cc_date, cc_description, cc_title, cc_video } = createSectionDto
    await checkId(cc_course_id)
    const findCourse = await this.Courses.findById(cc_course_id)
    if (!findCourse) {
      throw new NotFoundException('Course not found');
    }

    const createSectionOfCourse = await this.Sections.create({
      cc_course_id: cc_course_id,
      cc_title: cc_title.trim(),
      cc_description: cc_description.trim(),
      cc_video:cc_video.trim(),
      cc_date: cc_date
    })
    await createSectionOfCourse.save();

    findCourse.course_sections.push(createSectionOfCourse.id);
    await findCourse.save();

    return { message: "Success", statusCode: 200 }

  }

  update( updateSectionDto: UpdateSectionDto) {
    
    return `This action updates a #ection`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
