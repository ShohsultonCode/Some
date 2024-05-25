import * as mongoose from 'mongoose';

export const CourseContentSchema = new mongoose.Schema({
  cc_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true, unique: true },
  cc_title:{type:String, required:true},
  cc_description:{type:String, required:true},
  cc_video:{type:String, required:true},
  cc_date:{type:Date, required:true}
});
  