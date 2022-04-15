import mongoose from 'mongoose';
const { Schema, Types, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

UserSchema.methods.userId = function () {
  return this._id;
};

export default model('User', UserSchema);
