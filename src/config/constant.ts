import { UserSchema } from "src/common";
import { categorySchema } from "src/common/models/category.model";
import { CourseContentSchema } from "src/common/models/course.content";
import { CourseSchema } from "src/common/models/course.model";

export const CLOUDINARY = 'Cloudinary';

export const Schemas = [
  { name: 'Users', schema: UserSchema},
  { name: 'Categories', schema: categorySchema},
  { name: 'Courses', schema: CourseSchema},
  { name: 'Sections', schema: CourseContentSchema},
]
