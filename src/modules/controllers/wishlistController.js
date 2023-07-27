
import { userModel } from "../../../database/models/userModel.js";
import { deleteOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";


const addWishlist = catchErrors(async (req, res, next) => {
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

export {
  addWishlist,
};
