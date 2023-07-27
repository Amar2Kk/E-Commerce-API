import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'User name is required.'],
    minLength: [1, 'User name is too short.']
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Please enter a valid email address.'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password should be at least 6 characters long.']
  },
  passwordChangeDate: {
    type: Date
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    match: [
      /^\+?\d{1,3}?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      'Please enter a valid phone number.'
    ]
  },
  age: {
    type: Number,
    min: [12, 'Age must be a positive number.'],
    max: [120, 'Age must be less than or equal to 120.']
  },
  profilePic: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'seller', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  wishlist: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
})

// passwordHashing
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, Number(process.env.HASH_ROUNDS))
})

userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.HASH_ROUNDS))
})


export const userModel = mongoose.model('User', userSchema)