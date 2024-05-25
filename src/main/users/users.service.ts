import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, 
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

}
