import { userModel } from "../../../database/models/userModel.js";
import { sendEmail } from "../../email/emailVerification.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";

const addUser = catchErrors(async (req, res, next) => {
  const { email } = req.body;
  const User = await userModel.findOne({ email });
  if (User) return next(new AppError('User already exists!', 406));
  if (req.file) req.body.profilePic = req.file.filename
  let newUser = new userModel(req.body);
  await newUser.save();
  sendEmail({ email })
  res.status(201).json({
    status: 'success',
    message: 'User created successfully!',
    data: {
      User: newUser,
    },
  });
});

const getAllUsers = getAll(userModel, "User")

const getUser = getOne(userModel, "User")

const updateUser = catchErrors(async (req, res, next) => {
  const newUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );
  !newUser && next(new AppError('User not found', 404));
  newUser && res.status(201).json({
    status: 'success',
    message: 'User updated successfully!',
    data: {
      User: newUser,
    },
  });
});

const deleteUser = deleteOne(userModel, "User")

export {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
