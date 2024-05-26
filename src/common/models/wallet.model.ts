// src/users/schemas/user.schema.ts

import * as mongoose from 'mongoose';


export const walletSchema = new mongoose.Schema({
  wallet_amount: { type: Number},
  wallet_user_id: {  type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
  wallet_isactive:{type:Boolean, default:true},
});
