import { Router } from "express";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";
import { addToAddresses, deleteFromAddresses, getUserAddresses } from "../controllers/addressController.js";

export const addressRouter = new Router({ mergeParams: true });


addressRouter
  .route('/')
  .get(userAuth, allowedUsers('user'), getUserAddresses)
  .patch(userAuth, allowedUsers('user'), addToAddresses)
  .delete(userAuth, allowedUsers('user'), deleteFromAddresses)
