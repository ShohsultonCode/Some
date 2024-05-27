import { UserSchema } from "src/common";
import { categorySchema } from "src/common/models/category.model";
import { CourseContentSchema } from "src/common/models/course.content";
import { CourseSchema } from "src/common/models/course.model";
import { OrderPaymentsSchema } from "src/common/models/order.payments.model";
import { OrganizationSchema } from "src/common/models/org.model";
import { UserCourseSchema } from "src/common/models/user.course.model";
import { walletSchema } from "src/common/models/wallet.model";

export const CLOUDINARY = 'Cloudinary';

export const Schemas = [
  { name: 'Users', schema: UserSchema},
  { name: 'Categories', schema: categorySchema},
  { name: 'Courses', schema: CourseSchema},
  { name: 'Sections', schema: CourseContentSchema},
  { name: 'OrderPayments', schema: OrderPaymentsSchema},
  { name: 'Wallets', schema: walletSchema},
  { name: 'Organizations', schema: OrganizationSchema},
  { name: 'Usercourses', schema: UserCourseSchema},
]
