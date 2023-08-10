
import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";


const addToWishlist = catchErrors(async (req, res, next) => {
  const { product } = req.body;
  const Wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: product } },
    { new: true, runValidators: true }
  );
  !Wishlist && next(new AppError('Wishlist not found', 404));
  Wishlist && res.status(200).json({
    status: 'success',
    message: `${product} added successfully to the wishlist.`,
    data: {
      Wishlist: Wishlist.wishlist,
    },
  });
});


const getUserWishlist = catchErrors(async (req, res, next) => {
  const Wishlist = await userModel.findOne({ _id: req.user._id }).populate('wishlist');
  !Wishlist && next(new AppError('Wishlist not found', 404));
  Wishlist && res.status(200).json({
    status: 'success',
    data: {
      Wishlist: Wishlist.wishlist,
    },
  });
});

const deleteFromWishlist = catchErrors(async (req, res, next) => {
  const { product } = req.body;
  const Wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } },
    { new: true, runValidators: true }
  );
  !Wishlist && next(new AppError('Wishlist not found', 404));
  Wishlist && res.status(200).json({
    status: 'success',
    message: `${product} removed successfully from the wishlist.`,
    data: {
      Wishlist: Wishlist.wishlist,
    },
  });
});

export {
  addToWishlist,
  getUserWishlist,
  deleteFromWishlist,
};
