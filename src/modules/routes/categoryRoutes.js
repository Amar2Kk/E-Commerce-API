import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoryController.js";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { categoryIdSchema, createCategorySchema, updateCategorySchema } from "../validations/categoryValidation.js";
import { subCategoryRouter } from "./subCategoryRoutes.js";
import { uploadSingleFile } from "../../middlewares/fileUpload.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";

export const categoryRouter = new Router()


categoryRouter.use('/:categoryId/subcategories', subCategoryRouter)


categoryRouter
  .route('/')
  .post(userAuth, allowedUsers('admin'), uploadSingleFile('image', 'category'), SchemaValidation(createCategorySchema), addCategory)
  .get(getAllCategories)


categoryRouter
  .route('/:id')
  .get(SchemaValidation(categoryIdSchema), getCategory)
  .put(userAuth, allowedUsers('admin'), uploadSingleFile('image', 'category'), SchemaValidation(updateCategorySchema), updateCategory)
  .delete(userAuth, allowedUsers('admin'), SchemaValidation(categoryIdSchema), deleteCategory)
