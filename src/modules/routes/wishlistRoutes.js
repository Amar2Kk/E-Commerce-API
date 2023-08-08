import { Router } from "express";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";
import { addWishlist } from "../controllers/wishlistController.js";

export const wishlistRouter = new Router({ mergeParams: true });


wishlistRouter
  .route('/')
  .patch(userAuth, allowedUsers('user'), addWishlist)
  .get(getAllReviews)
