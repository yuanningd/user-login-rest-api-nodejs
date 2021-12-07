import mongoose from "mongoose";

interface IUser {
  name: string,
  pwd: string,
  locked: boolean
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true,
  },
  locked: {
    type: Boolean,
    default: false,
    required: true,
  }
});

const model = mongoose.model<IUser>('User', schema);

export default model;

