import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";


const addToAddresses = catchErrors(async (req, res, next) => {
  const Address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true, runValidators: true }
  );
  !Address && next(new AppError('Address not found', 404));
  Address && res.status(200).json({
    status: 'success',
    message: `Added successfully to the Addresses.`,
    data: {
      Address: Address.addresses,
    },
  });
});


const getUserAddresses = catchErrors(async (req, res, next) => {
  const Address = await userModel.findOne({ _id: req.user._id }).populate('addresses');
  !Address && next(new AppError('Address not found', 404));
  Address && res.status(200).json({
    status: 'success',
    data: {
      Address: Address.addresses,
    },
  });
});

const deleteFromAddresses = catchErrors(async (req, res, next) => {
  const Address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: {_id:req.body.address} } },
    { new: true, runValidators: true }
  );
  !Address && next(new AppError('Address not found', 404));
  Address && res.status(200).json({
    status: 'success',
    message: `Removed successfully from the Addresses.`,
    data: {
      Address: Address.addresses,
    },
  });
});

export {
  addToAddresses,
  getUserAddresses,
  deleteFromAddresses,
};
