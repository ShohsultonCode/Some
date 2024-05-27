import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, Section, User, UserSectionCompletion } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { CreateUserSectionCompletionDto } from './dto/completion.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel('Courses') private readonly Courses: Model<Course>,
    @InjectModel('Sections') private readonly Sections: Model<Section>,
    @InjectModel('Users') private readonly Users: Model<User>,
    @InjectModel('UserSectionComletions') private readonly UserSectionCompletions: Model<UserSectionCompletion>,
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
      cc_video: cc_video.trim(),
      cc_date: cc_date
    })
    await createSectionOfCourse.save();

    findCourse.course_sections.push(createSectionOfCourse.id);
    await findCourse.save();

    return { message: "Success", statusCode: 200 }

  }

  async update(updateSectionDto: UpdateSectionDto): Promise<Object> {
    const { cc_id, cc_course_id, cc_date, cc_description, cc_title, cc_video } = updateSectionDto;
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

  async delete(id: string): Promise<Object> {
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

  async completeSection(@Body() body: CreateUserSectionCompletionDto, req: any): Promise<Object> {
    const { usc_course_id, usc_section_id } = body
    await checkId(usc_course_id)
    await checkId(usc_section_id)
    const findCourse = await this.Courses.findById(usc_course_id)
    const findSection = await this.Sections.findById(usc_section_id)
    if (!findCourse || !findSection) {
      throw new NotFoundException("Course or Section not found")
    }
    const createCompletion = await this.UserSectionCompletions.create({
      usc_course_id: usc_course_id,
      usc_is_completed: true,
      usc_completion_date: Date.now(),
      usc_section_id: usc_section_id,
      usc_user_id: req.user.id
    })

    return { message: "Success", statusCode: 200 }
  }

  async myCompleteSection(req: any): Promise<Object> {
    const userId = req.user.id
    await checkId(userId)
    const findUser = await this.Users.findById(userId)
    if (!findUser) {
      throw new NotFoundException("User not found")
    }
    const myCompletionSections = await this.UserSectionCompletions.find({
      usc_user_id: req.user.id,
      usc_is_completed: true,
    })


    return { message: "Success", statusCode: 200, data: myCompletionSections }
  }
}

