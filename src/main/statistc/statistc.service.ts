import { Injectable } from '@nestjs/common';
import { CreateStatistcDto } from './dto/create-statistc.dto';
import { UpdateStatistcDto } from './dto/update-statistc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, Course, OrderPayment, Org, Section, User, Wallets } from 'src/common/entity/user.entity';

@Injectable()
export class StatistcService {
  constructor(
    @InjectModel('Courses') private readonly Courses: Model<Course>,
    @InjectModel('Categories') private readonly Categories: Model<Category>,
    @InjectModel('Sections') private readonly Sections: Model<Section>,
    @InjectModel('Users') private readonly Users: Model<User>,
    @InjectModel('OrderPayments') private readonly OrderPayments: Model<OrderPayment>,
    @InjectModel('Wallets') private readonly Wallets: Model<Wallets>,
    @InjectModel('Organizations') private readonly Org: Model<Org>,
  ) { }

  async findAllUsers(): Promise<Object> {
    const findAllUsers = await this.Users.find().select('-user_password -user_role -user_wallet');
    return {
      message: "Success", data: {
        users: findAllUsers,
        numberofusers: findAllUsers.length
      }
    }
  }

  async findAllCources(): Promise<Object> {
    const courses = await this.Courses.find().select('-course_sections -course_learns -course_video');
    return {
      message: "Success",
      data: {
        users: courses,
        numberofusers: courses.length,
      },
    }
  }

  async findAllCategories(): Promise<Object> {
    const categories = await this.Categories.find().exec()
    return {
      message: "Success",
      data: {
        categories: categories,
        numberofcategories: categories.length,
      },
    }
  }

  async findAllOrderPayments(): Promise<Object> {
    const data =  await this.OrderPayments
      .find()
      .populate('orderp_user_id')
      .populate('orderp_course_id')
      .exec();

      return {
        message: "Success", data: {
          orderpayments: data,
          numberofop: data.length
        }
  }
}


  async findAllWallets(): Promise<Object> {
    const data = await this.Wallets
      .find()
      .populate('wallet_user_id')
      .exec();
    return {
      message: "Success", data: {
        wallets: data,
        numberofwallets: data.length
      }
    }
  }


  async findFunds(): Promise<Object> {
    const data =  await this.Org
      .find()
      return {
        message: "Success", data:data
  }
}

async createOrg(): Promise<Object> {
  const createORg = await this.Org.create({
    org_name:"Brain Group"
  })
  return
}
}
