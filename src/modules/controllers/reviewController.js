import { reviewModel } from "../../../database/models/reviewModel.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";

const addReview = catchErrors(async (req, res, next) => {
  req.body.user = req.user._id
  const isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
  if (isReview) return next(new AppError('Review already exists!', 406));
  let newReview = new reviewModel(req.body);
  await newReview.save();
  res.status(201).json({
    status: 'success',
    data: {
      Review: newReview,
    },
  });
});

const getAllReviews = getAll(reviewModel, "Review")

const getReview = getOne(reviewModel, "Review")

const updateReview = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedReview = await reviewModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  !updatedReview && next(new AppError('Review not found', 404));
  updatedReview && res.status(200).json({
    status: 'success',
    message: `${id} updated successfully.`,
    data: {
      Review: updatedReview,
    },
  });
});

const deleteReview = deleteOne(reviewModel, "Review")

export {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
