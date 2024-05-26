import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, Org, User, Wallets } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { Cource } from '../cources/entities/cource.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, 
    @InjectModel('Wallets') private readonly Wallets: Model<Wallets>, 
    @InjectModel('Courses') private readonly Cources: Model<Course>, 
    @InjectModel('Organizations') private readonly Org: Model<Org>, 
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

  async registerCourse(courseId: string, req: any): Promise<Object> {
    const userId = req.user.id;
    await checkId(courseId);
    await checkId(userId);
  
    const findUser = await this.Users.findById(userId);
    const findCource = await this.Cources.findById(courseId);
  
    if (!findUser || !findCource) {
      throw new NotFoundException("Course or User not found");
    }
  
    const coursePrice = Number(findCource.course_price);
  
    const findWallet = await this.Wallets.findOne({
      wallet_user_id: userId
    });
  
    if (!findWallet || findWallet.wallet_amount < coursePrice) {
      throw new BadRequestException("Insufficient funds or you do not have a wallet");
    }
  
    const org = await this.Org.find();
  
    if (!org[0]) {
      throw new BadRequestException("There is no organization");
    }
  
    const organization = org[0];
    const organizationShare =  coursePrice * 0.10;
  
    findWallet.wallet_amount -= Number(coursePrice);
  
    organization.org_balance += Number(organizationShare);
  
    await findWallet.save();
    await organization.save();
    

    return {
      message: "Course registered successfully",
      statusCode: 200
    };
  }
  
}
