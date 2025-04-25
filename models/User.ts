import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    require: false,
    default: false,
  },
});

UserSchema.set("collection", "users");

const User =
  mongoose.models.Users || (mongoose.model("Users", UserSchema) as any);

export default User;
