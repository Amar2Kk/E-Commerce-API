import { Router } from "express";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "../controllers/reviewController.js";
import { createReviewSchema, reviewIdSchema, updateReviewSchema } from "../validations/reviewValidation.js";

export const reviewRouter = new Router({ mergeParams: true });


reviewRouter
  .route('/')
  .post(userAuth, allowedUsers('admin', 'user'), SchemaValidation(createReviewSchema), addReview)
  .get(getAllReviews)


reviewRouter
  .route('/:id')
  .get(SchemaValidation(reviewIdSchema), getReview)
  .put(userAuth, allowedUsers('admin', 'user'), SchemaValidation(updateReviewSchema), updateReview)
  .delete(userAuth, allowedUsers('admin', 'user'), SchemaValidation(reviewIdSchema), deleteReview)
