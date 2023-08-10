import { Router } from "express";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";
import { addToWishlist, deleteFromWishlist, getUserWishlist } from "../controllers/wishlistController.js";

export const wishlistRouter = new Router({ mergeParams: true });


wishlistRouter
  .route('/')
  .get(userAuth, allowedUsers('user'), getUserWishlist)
  .patch(userAuth, allowedUsers('user'), addToWishlist)
  .delete(userAuth, allowedUsers('user'), deleteFromWishlist)
