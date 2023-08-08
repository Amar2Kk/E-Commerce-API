import { subCategoryModel } from "../../../database/models/subcategoryModel.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";

import slugify from 'slugify'

const addSubCategory = catchErrors(async (req, res, next) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.findOne({ name });
  if (subCategory) return next(new AppError('Sub-Category already exists', 406));
  let newSubCategory = new subCategoryModel({ name, slug: slugify(name), category });
  await newSubCategory.save();
  res.status(201).json({
    status: 'success',
    data: {
      subCategory: newSubCategory,
    },
  });
});

const getAllSubCategories = getAll(subCategoryModel, "Sub-Category")

const getSubCategory = getOne(subCategoryModel, "Sub-Category")

const updateSubCategory = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updatedSubCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true, runValidators: true }
  );
  !updatedSubCategory && next(new AppError('Sub-Category not found', 404));
  updatedSubCategory && res.status(200).json({
    status: 'success',
    message: `${id} updated successfully.`,
    data: {
      subCategory: updatedSubCategory,
    },
  });
});

const deleteSubCategory = deleteOne(subCategoryModel, "Sub-Category")

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
