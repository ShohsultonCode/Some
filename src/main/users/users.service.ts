import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, User } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { Cource } from '../cources/entities/cource.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, 
    @InjectModel('Courses') private readonly Cources: Model<Course>, 
  ) {}

  async getProfile(req: any): Promise<Object> {
    try {
      const user = await this.Users.findById(req.user.id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      
      const { user_firstname, user_lastname, user_email } = user;
  
      return {
        message: 'Success',
        statusCode: 200,
        data: {
          user_firstname,
          user_lastname,
          user_email
        }
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async registerCourse(courseId:string, req: any): Promise<Object> {
    const userId = req.user.id
    await checkId(courseId)
    await checkId(userId)

    const findUser = await this.Users.findById(userId)
    const findCource = await this.Cources.findById(courseId)
    
    if (!findUser || findCource) {
      throw new NotFoundException("Course or User not found")
    }

    const userBudget = findUser.user_wallet
    const coursePrice = findCource.course_price

    

    return

  }

}
