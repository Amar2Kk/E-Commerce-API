import { Router } from "express";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { brandIdSchema, createBrandSchema, updateBrandSchema } from "../validations/brandValidation.js";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../controllers/brandController.js";
import { uploadSingleFile } from "../../middlewares/fileUpload.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";

export const brandRouter = new Router();


brandRouter
  .route('/')
  .post(userAuth, allowedUsers('admin', 'seller'), uploadSingleFile('logo', 'brand'), SchemaValidation(createBrandSchema), addBrand)
  .get(getAllBrands);


brandRouter
  .route('/:id')
  .get(SchemaValidation(brandIdSchema), getBrand)
  .put(userAuth, allowedUsers('admin', 'seller'), uploadSingleFile('logo', 'brand'), SchemaValidation(updateBrandSchema), updateBrand)
  .delete(userAuth, allowedUsers('admin', 'seller'), SchemaValidation(brandIdSchema), deleteBrand)
