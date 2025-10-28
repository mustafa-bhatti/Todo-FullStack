import mongoose from 'mongoose';

let expenseSchema = mongoose.Schema({
  exp_id: {
    type: Number,
    required: true,
  },
  User_id: {
    type: Number,
  },
  exp_date: {
    type: String,
    required: true,
  },
  exp_value: {
    type: Number,
    default: 0,
  },
  exp_category: {
    type: String,
    required: true,
  },
});

const expenseModel = mongoose.model('expense', expenseSchema);
export default expenseModel;
