import mongoose from "mongoose";


//user roles
export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
export interface User extends Document {
  id: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_image: string;
  user_card: number;
  user_role: UserRole;
  user_isactive: boolean;
  user_last_login_date: Date;
}
export interface Category extends Document {
  id: string;
  category_name: string;
  category_description: string;
  category_image: any;
  category_isactive: boolean;
}

export interface Course extends Document {
  id: string;
  course_name: string;
  course_description: string;
  course_category: mongoose.Schema.Types.ObjectId;
  course_people_count: mongoose.Schema.Types.ObjectId[];
  course_sections: mongoose.Schema.Types.ObjectId[];
  course_price: string;
  course_learns: string[];
  course_duration: string;
  course_video: string;
  course_isactive: boolean;
}



export interface Section extends Document {
  cc_course_id: string;
  cc_title: string;
  cc_description: string;
  cc_video: string;
  cc_date: Date;
}


export default interface UploadedFileInter {
  fieldname: string;
  originalname: string;
  name: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number
}
