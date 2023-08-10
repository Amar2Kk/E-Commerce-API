import { Router } from "express";
import { logIn, logOut, resetUserPassword, sendPasswordResetEmail, signUp, uploadPfp, verifyEmail } from "../controllers/authController.js";
import { LoginSchema, signUpSchema } from "../validations/authValidation.js";
import { uploadSingleFile } from "../../middlewares/fileUpload.js";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";

export const authRouter = new Router();

// Sign up route (public)
authRouter.post('/signup', uploadSingleFile('profilePic', 'user'), SchemaValidation(signUpSchema), signUp)

// Verify Email route (public)
authRouter.get('/verifyEmail/:token', verifyEmail)

// Log in route (public)
authRouter.post('/login', SchemaValidation(LoginSchema), logIn)

// send password reset email route (public)
authRouter.post('/requestpasswordreset', sendPasswordResetEmail)

// update user password route (public)
authRouter.post('/resetpassword', resetUserPassword)

// Log out route (public)
authRouter.get('/logout', logOut)

// upload user profile pic route (public)
authRouter.post('/uploadPfp', uploadSingleFile('profilePic', 'user'), uploadPfp)
