import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Admin", "Instructor", "Student"],
      default: "Student",
    },
    description: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      // required: true HATAYA — register ke waqt cart nahi hota
    },
  },
  { timestamps: true }
);

// Password hash karo save se pehlev
userSchema.pre("save", async function (next) {  // regular function
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password verify karo
userSchema.methods.isPasswordCorrect = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

// Access Token generate karo
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Refresh Token generate karo
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
