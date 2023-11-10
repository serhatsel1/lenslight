import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username area is required !"],
      lowercase:true, 
      validate:[validator.isAlphanumeric,"Only Alphanumeric charecters"],
    },
    email: {
      type: String,
      required: [true, "Email arae is required !"],
      unique: true,
      validate:[validator.isEmail,"Valid email is requered !"]
    },
    password: {
      type: String,
      required: [true, "Password area is required !"],
      minlength:[4,"Password is minimum length 'for' charecters"],
      maxlength:[10,"Password is minimum length 'ten' charecters"]
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    (user.password = hash),

    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
