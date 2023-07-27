import { productModel } from "../../../database/models/productModel.js";
import { deleteOne, getAll, getOne } from "../../handlers/factorHandler.js";
import { AppError } from "../../utils/errors/AppError.js";
import { catchErrors } from "../../utils/errors/catchAsyncError.js";

import slugify from 'slugify'

const addProduct = catchErrors(async (req, res, next) => {
  const { title } = req.body;
  const Product = await productModel.findOne({ title });
  if (Product) return next(new AppError('Product already exists', 406));
  req.body.slug = slugify(req.body.title)
  req.body.coverImg = req.files.coverImg[0].filename
  req.body.images = req.files.images.map(el => el.filename)
  let newProduct = new productModel(req.body);
  await newProduct.save();
  res.status(201).json({
    status: 'success',
    data: {
      Product: newProduct,
    },
  });
});

const getAllProducts = getAll(productModel, "Product")

const getProduct = getOne(productModel, "Product")

const updateProduct = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title)
  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true, runValidators: true }
  );
  !updatedProduct && next(new AppError('Product not found', 404));
  updatedProduct && res.status(200).json({
    status: 'success',
    message: `${id} updated successfully.`,
    data: {
      Product: updatedProduct,
    },
  });
});

const deleteProduct = deleteOne(productModel, "Product")

export {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
