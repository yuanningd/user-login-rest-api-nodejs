import mongoose from "mongoose";

interface IWrongPasswordInputRecord {
  username: string,
  dateTime: Date
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true,
  }
})

const model = mongoose.model<IWrongPasswordInputRecord>('wrongPasswordInputRecord', schema);

export default model;