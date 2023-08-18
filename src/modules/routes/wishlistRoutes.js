import { Router } from "express";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";
import { addToWishlist, deleteFromWishlist, getUserWishlist } from "../controllers/wishlistController.js";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { WishlistIdSchema } from "../validations/wishlistValidation.js";

export const wishlistRouter = new Router({ mergeParams: true });


wishlistRouter
  .route('/')
  .get(userAuth, allowedUsers('user'), getUserWishlist)
  .patch(userAuth, allowedUsers('user'), SchemaValidation(WishlistIdSchema), addToWishlist)
  .delete(userAuth, allowedUsers('user'), SchemaValidation(WishlistIdSchema), deleteFromWishlist)
