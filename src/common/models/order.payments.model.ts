import * as mongoose from 'mongoose';

export const OrderPaymentsSchema = new mongoose.Schema({
  orderp_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  orderp_user_wallet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallets', required: true },
  orderp_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
  orderp_price_amount: { type: String, required: true },
  orderp_date: { type: Date, required: true }
});
