import * as mongoose from 'mongoose';

export const UserSectionCompletionSchema = new mongoose.Schema({
  usc_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  usc_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
  usc_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sections', required: true },
  usc_is_completed: { type: Boolean, default: false },
  usc_completion_date: { type: Date, default: null }
});
