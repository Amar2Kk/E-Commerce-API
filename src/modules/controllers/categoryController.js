import { categoryModel } from "../../../database/models/categoryModel.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";
import slugify from 'slugify'

const addCategory = catchErrors(async (req, res, next) => {
  const { name } = req.body
  const category = await categoryModel.findOne({ name });
  if (category) return next(new AppError('Category already exists', 406));
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename
  let newCategory = new categoryModel(req.body);
  await newCategory.save();
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory,
    },
  });
});

const getAllCategories = getAll(categoryModel, "Category")

const getCategory = getOne(categoryModel, "Category")

const updateCategory = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );
  !updatedCategory && next(new AppError('Category not found', 404));
  updatedCategory && res.status(200).json({
    status: 'success',
    message: `${id} updated successfully.`,
    data: {
      category: updatedCategory,
    },
  });
});

const deleteCategory = deleteOne(categoryModel, "Category")

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
