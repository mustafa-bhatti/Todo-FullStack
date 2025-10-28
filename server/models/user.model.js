import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
  User_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
