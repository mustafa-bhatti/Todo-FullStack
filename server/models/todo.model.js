import mongoose from 'mongoose';

let todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model('todo', todoSchema);
export default todoModel;
