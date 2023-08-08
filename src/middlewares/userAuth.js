import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/errors/catchAsyncError.js";
import { AppError } from "../utils/errors/AppError.js";
import { userModel } from "../../database/models/userModel.js";

export const userAuth = catchErrors(async (req, res, next) => {
  console.log('Authentication middleware called.🔍');
  const token = req.header('token');
  if (!token) return next(new AppError('Token must be provided!', 401))
  const decodedUser = jwt.verify(token, process.env.SECRET_KEY)
  let user = await userModel.findById(decodedUser.userId)
  if (!user) return next(new AppError('Invalid token!', 404))
  if (user.passwordChangeDate) {
    let changePasswordDate = parseInt(user.passwordChangeDate.getTime() / 1000)
    if (changePasswordDate > decodedUser.iat) return next(new AppError('Invalid token!', 404))
  }
  req.user = user;
  next();
})

export const allowedUsers = (...roles) => {
  return catchErrors((req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not authorized to do this action as a ' + req.user.role, 401))
    }
    next()
  })
}


