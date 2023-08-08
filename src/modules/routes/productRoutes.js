import { Router } from "express";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { createProductSchema, productIdSchema, updateProductSchema } from "../validations/productValidation.js";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import { uploadManyFile } from "../../middlewares/fileUpload.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";

export const productRouter = new Router();
let uploadFields = [{ name: 'coverImg', maxCount: 1 }, { name: 'images', maxCount: 5 }]

productRouter
  .route('/')
  .post(userAuth, allowedUsers('admin', 'seller'), uploadManyFile(uploadFields, 'product'), SchemaValidation(createProductSchema), addProduct)
  .get(getAllProducts);


productRouter
  .route('/:id')
  .get(SchemaValidation(productIdSchema), getProduct)
  .put(userAuth, allowedUsers('admin', 'seller'), SchemaValidation(updateProductSchema), updateProduct)
  .delete(userAuth, allowedUsers('admin', 'seller'), SchemaValidation(productIdSchema), deleteProduct)
