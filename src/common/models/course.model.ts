import * as mongoose from 'mongoose';


export const CourseSchema = new mongoose.Schema({
  course_name: { type: String, required: true},
  course_description: { type: String, required: true},
  course_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  course_people_count: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
  course_sections: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sections' }], default: null },
  course_price: { type: String, required: true},
  course_learns:[{ type: String, required: true}],
  course_duration: { type: String, required: true},
  course_video: { type: String, required: true},
  course_isactive:{type:Boolean, default:true},
});
