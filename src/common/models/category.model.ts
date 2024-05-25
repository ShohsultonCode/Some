import * as mongoose from 'mongoose';


export const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique:true },
  category_image: { type: String, required: true},
  category_isactive:{type:Boolean, default:true},
});
