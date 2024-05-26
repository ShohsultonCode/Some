import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  org_name: { type: String, default:"Brain Group" },
  org_balance: { type: String, default: null }
});
