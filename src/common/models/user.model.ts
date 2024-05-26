// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  user_firstname: { type: String, required: true },
  user_lastname: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_image: { type: String,  default:null},
  user_password: { type: String, required: true },
  user_role: { type: String, required: true, default:"user"},
});
