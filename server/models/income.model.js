import mongoose from 'mongoose';

let incomeSchema = mongoose.Schema({
  inc_id: {
    type: Number,
    required: true,
  },
  User_id: {
    type: Number,
  },
  inc_date: {
    type: String,
    required: true,
  },
  inc_value: {
    type: Number,
    default: 0,
  },
    inc_source: {
    type: String,
    required: true,
  },
});

const incomeModel = mongoose.model('income', incomeSchema);
export default incomeModel;
