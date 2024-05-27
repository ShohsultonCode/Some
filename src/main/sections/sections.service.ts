import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, OrderPayment, Section } from 'src/common/entity/user.entity';
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

  async update( updateSectionDto: UpdateSectionDto):Promise<Object> {
    const {cc_id, cc_course_id, cc_date, cc_description, cc_title, cc_video } = updateSectionDto;
    await checkId(cc_course_id);
    await checkId(cc_id)
    const findSection = await this.Sections.findById(cc_id);
    if (!findSection) {
      throw new NotFoundException('Section not found');
    }
    const updatedSectionData = {
      cc_title: cc_title || findSection.cc_title,
      cc_description: cc_description || findSection.cc_description,
      cc_video: cc_video || findSection.cc_video,
      cc_date: cc_date || findSection.cc_date,
    };

    const updatedSection = await this.Sections.findByIdAndUpdate(
      cc_id,
      updatedSectionData,
      { new: true }
    );

    if (!updatedSection) {
      throw new NotFoundException('Failed to update section');
    }

    return { message: 'Successfully updated', statusCode: 200 };
  }
  
  async delete( id: string):Promise<Object> {
    await checkId(id);

    const findSection = await this.Sections.findById(id);
    if (!findSection) {
      throw new NotFoundException('Section not found');
    }

    const findCourseOfS = await this.Courses.findById(findSection.cc_course_id);
    if (!findCourseOfS) {
      throw new NotFoundException('Course not found for the section');
    }

    findCourseOfS.course_sections = findCourseOfS.course_sections.filter(sectionId => sectionId.toString() !== id);

    await findCourseOfS.save();

    await this.Sections.findByIdAndDelete(id);

    return { message: 'Successfully deleted', statusCode: 200 };
  }
}
 
  