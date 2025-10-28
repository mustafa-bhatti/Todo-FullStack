import mongoose from 'mongoose';

let balanceSchema = mongoose.Schema({
  balance_id: {
    type: Number,
    required: true,
  },
  User_id: {
    type: Number,
  },
  balance_date: {
    type: String,
    required: true,
  },
  account_name: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
  curr_balance: {
    type: Number,
    default: 0,
  },
});

const balanceModel = mongoose.model('balance', balanceSchema);
export default balanceModel;
