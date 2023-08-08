import { Router } from "express";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";

import { uploadSingleFile } from "../../middlewares/fileUpload.js";
import { createUserSchema, updateUserSchema, userIdSchema } from "../validations/userValidation.js";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";

export const userRouter = new Router();


userRouter
  .route('/')
  .post(userAuth, allowedUsers('admin'), uploadSingleFile('profilePic', 'user'), SchemaValidation(createUserSchema), addUser)
  .get(userAuth, allowedUsers('admin'), getAllUsers);


userRouter
  .route('/:id')
  .get(userAuth, allowedUsers('admin'), SchemaValidation(userIdSchema), getUser)
  .put(userAuth, allowedUsers('admin'), uploadSingleFile('logo', 'user'), SchemaValidation(updateUserSchema), updateUser)
  .delete(userAuth, allowedUsers('admin'), SchemaValidation(userIdSchema), deleteUser)
