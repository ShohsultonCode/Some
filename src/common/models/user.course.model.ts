import * as mongoose from 'mongoose';

export const UserCourseSchema = new mongoose.Schema({
  uc_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  uc_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
  uc_completed: { type: Boolean, required: true },
  uc_price_action: { type: String, required: true },
  uc_date: { type: Date, required: true }
});

UserCourseSchema.index({ uc_user_id: 1, uc_course_id: 1 }, { unique: true });
