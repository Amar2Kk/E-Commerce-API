import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";
import { generateToken } from "../../utils/generateToken.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendResetEmail } from "../../email/passwordReset.js";
import { sendEmail } from "../../email/emailVerification.js";

const signUp = catchErrors(async (req, res, next) => {
  const User = await userModel.findOne(req.body.email);
  if (User) return next(new AppError('User already exists!', 406));
  req.body.profilePic = req.file.filename
  let newUser = new userModel(req.body);
  await newUser.save();
  sendEmail({ email })
  res.status(201).json({
    status: 'success',
    message: 'Congratulations! 🎉 You have successfully signed up!',
  });
})

const verifyEmail = catchErrors(async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return next(new AppError(`token error:${err.message}`, 500))
    await userModel.findOneAndUpdate({ email: decoded.email }, { isVerified: true });
    res.status(201).json({
      status: 'success',
      message: 'Congratulations! 👍🏻 You have successfully verified your email address!'
    });
  })
})

const uploadPfp = catchErrors(async (req, res, next) => {
  const userId = req.userId;
  const user = await userModel.findById(userId);
  if (!user) return next(new AppError(`User doesn't exist.`, 406));
  if (!req.file) return next(new AppError(`Only images can be uploaded.`, 406));
  await userModel.updateOne(user, { profilePic: req.file.filename, userId })
  res.status(201).json({
    status: 'success',
    message: 'Congratulations! 🎉 You have successfully attached your profile picture!'
  });
});



const sendPasswordResetEmail = catchErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError('User not found', 404));
  const resetToken = generateToken({
    userId: user._id,
    email: user.email,
  })
  await sendResetEmail({ email, resetToken })
  res.status(200).json({
    status: 'success',
    message: 'An email has been sent to your email address to reset your password!'
  });
});

const resetUserPassword = catchErrors(async (req, res, next) => {
  const { token } = req.query;
  if (!token) return next(new AppError('Token not found', 400))
  const newPassword = req.body.password
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return next(new AppError(`Token error:${err.message}`, 500))
    await userModel.findOneAndUpdate({ email: decoded.email }, { password: newPassword, passwordChangeDate: Date.now() });
    res.status(200).json({
      status: 'success',
      message: 'You Have updated your password successfully!'
    });
  });
});

const logIn = catchErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError(`Invalid email or password`, 400))
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(`Invalid email or password`, 400))
  const token = generateToken({
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  })
  res.status(201).json({
    status: 'success',
    message: 'Logged in👋🏼',
    token: token
  });
})


const logOut = catchErrors(async (req, res, next) => {
  if (!req.headers.authorization) return next(new AppError(`Authorization header missing`, 401))
  const token = req.headers.authorization.split(' ')[1];
  res.status(200).send('Logout successful');
})

export {
  signUp,
  verifyEmail,
  uploadPfp,
  sendPasswordResetEmail,
  resetUserPassword,
  logIn,
  logOut
}