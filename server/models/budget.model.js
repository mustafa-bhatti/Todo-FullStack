import mongoose from 'mongoose';

let budgetSchema = mongoose.Schema({
  budget_id: {
    type: Number,
    required: true,
  },
  User_id: {
    type: Number,
  },
  bud_date: {
    type: String,
    required: true,
  },
  bud_ammount: {
    type: Number,
    default: 0,
  },
});

const budgetModel = mongoose.model('budget', budgetSchema);
export default budgetModel;
