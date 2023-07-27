import { brandModel } from "../../../database/models/brandModel.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";

import slugify from 'slugify'

const addBrand = catchErrors(async (req, res, next) => {
  const { name } = req.body;
  const brand = await brandModel.findOne({ name });
  if (brand) return next(new AppError('Brand already exists', 406));
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename
  let newBrand = new brandModel(req.body);
  await newBrand.save();
  res.status(201).json({
    status: 'success',
    data: {
      brand: newBrand,
    },
  });
});

const getAllBrands = getAll(brandModel, "Brand")

const getBrand = getOne(brandModel, "Brand")

const updateBrand = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updatedBrand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true, runValidators: true }
  );
  !updatedBrand && next(new AppError('Brand not found', 404));
  updatedBrand && res.status(200).json({
    status: 'success',
    message: `${id} updated successfully.`,
    data: {
      brand: updatedBrand,
    },
  });
});

const deleteBrand = deleteOne(brandModel, "Brand")

export {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
