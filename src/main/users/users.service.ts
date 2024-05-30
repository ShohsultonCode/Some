import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, OrderPayment, Org, User, UserCourse, Wallets } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>,
    @InjectModel('Wallets') private readonly Wallets: Model<Wallets>,
    @InjectModel('Courses') private readonly Cources: Model<Course>,
    @InjectModel('Organizations') private readonly Org: Model<Org>,
    @InjectModel('Usercourses') private readonly UserCourse: Model<UserCourse>,
    @InjectModel('OrderPayments') private readonly OrderPayment: Model<OrderPayment>,
  ) { }

  async createOrg(){
    const data =  await this.Org
      .find()
      return {
        message: "Success", data:data
      }
  }
  async getProfile(req: any): Promise<Object> {
    try {
      const user = await this.Users.findById(req.user.id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }

      const { user_firstname, user_lastname, user_email, user_image, user_last_login_date } = user;

      return {
        message: 'Success',
        statusCode: 200,
        data: {
          user_firstname,
          user_lastname,
          user_email, 
          user_image, 
          user_last_login_date
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
    const findCourse = await this.Cources.findById(courseId);
  
    if (!findUser || !findCourse) {
      throw new NotFoundException("Course or User not found");
    }
  
    const checkAlreadyRegisteredCourse = await this.UserCourse.findOne({
      uc_course_id: findCourse.id,
      uc_user_id: findUser.id
    });
  
    if (checkAlreadyRegisteredCourse) {
      throw new BadRequestException("You can buy the course only once");
    }
  
    const coursePrice = Number(findCourse.course_price);
  
    const findWallet = await this.Wallets.findOne({
      wallet_user_id: findUser.id
    });
  
    if (!findWallet || findWallet.wallet_amount < coursePrice) {
      throw new BadRequestException("Insufficient funds or you do not have a wallet");
    }
  
    const org = await this.Org.find();
  
    if (!org[0]) {
      throw new BadRequestException("There is no organization");
    }
  
    const organization = org[0];
    const organizationShare = Number(findCourse.course_price)
    findWallet.wallet_amount -= coursePrice;
    organization.org_balance += coursePrice
    await findWallet.save();
    await organization.save();
  
    const createUserCourse = new this.UserCourse({
      uc_course_id: findCourse.id,
      uc_price_action: coursePrice,
      uc_user_id: userId,
      uc_date: Date.now(),
      uc_completed: false
    });
  
    // Check if the OrderPayment entry already exists
    const existingOrderPayment = await this.OrderPayment.findOne({
      orderp_course_id: findCourse.id,
      orderp_user_id: findUser.id
    });
  
    if (!existingOrderPayment) {
      const createOrderPayment = new this.OrderPayment({
        orderp_course_id: findCourse.id,
        orderp_user_id: findUser.id,
        orderp_price_amount: coursePrice,
        orderp_date: Date.now(),
        orderp_user_wallet_id: findWallet.id
      });
      await createOrderPayment.save();
    } else {
      throw new BadRequestException("Order payment already exists for this course and user");
    }
  
    await createUserCourse.save();
  
    return {
      message: "Course registered successfully",
      statusCode: 200
    };
  }
  
  async completeCourse():Promise<Object>{
    
    return
  }



}
