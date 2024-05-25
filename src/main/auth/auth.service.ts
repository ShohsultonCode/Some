import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { Model } from 'mongoose';
import UploadedFileInter, { User } from 'src/common/entity/user.entity';
import { loginWithEmailDto } from './dto/loginwithEmaildto';
import { registerDto } from './dto/register.dto';
import { updateProfileDto } from './dto/update.profile.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class AuthService {
  private readonly oauth2Client: OAuth2Client;

  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, 
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly imageService: ImageService,
  ) {}

  async registerWithEmail(registerData: registerDto): Promise<Object> {
    try {
      const existingUser = await this.Users.findOne({
        user_email: registerData.user_email.trim(),
      });

      if (existingUser) {
        throw new BadRequestException('This email is already registered');
      }

      const hashedPassword = await bcrypt.hash(
        registerData.user_password.trim(),
        10,
      );

      const newUser = {
        user_firstname: registerData.user_firstname.trim(),
        user_lastname: registerData.user_lastname.trim(),
        user_email: registerData.user_email.trim(),
        user_password: hashedPassword,
      };

      const result = await this.Users.create(newUser);

      const payload = { id: result.id, role: result.user_role };
      const token = await this.jwtService.sign(payload);

      return {
        message: 'Successfully registered',
        statusCode: 201,
        token: token,
        role: result.user_role,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async loginWithEmail(body: loginWithEmailDto): Promise<Object> {
    try {
      const user = await this.Users.findOne(
        { user_email: body.user_email }
      );

      if (!user) {
        throw new BadRequestException('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(body.user_password, user.user_password);

      if (!passwordMatch) {
        throw new BadRequestException('Invalid email or password');
      }

      const payload = { id: user.id, role: user.user_role };
      const token = await this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        statusCode: 200,
        token: token,
        role: user.user_role,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }



  }

  async updateProfile(body: updateProfileDto, req: any, file:UploadedFileInter): Promise<Object> {
    try {
      const { id } = req.user;
      const { user_firstname, user_lastname, user_password, user_email } = body;
      
      const user = await this.Users.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      if (file && file.filename) {
        const imageNameToDelete = user.user_image;
        const deleteImage = await this.imageService.deleteImage(imageNameToDelete)
        user.user_image = file.filename
        await user.save()
    }

      const updateTemplate = {
        ...(user_firstname && { user_firstname }),
        ...(user_lastname && { user_lastname }),
        ...(user_email && { user_email }),
        ...(user_password && { user_password: await bcrypt.hash(user_password.trim(), 10) })
      };
  
      const updatedUser = await this.Users.findByIdAndUpdate(id, updateTemplate, { new: true });
  
      if (!updatedUser) {
        throw new NotFoundException('Failed to update user');
      }
  
      return {
        message: 'Update successful!',
        statusCode: 200,
        role: updatedUser.user_role,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
}
