import { Router } from "express";
import { SchemaValidation } from "../../middlewares/schemaValidation.js";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../controllers/subCategoryController.js";
import { createSubCategorySchema, subCategoryIdSchema, updateSubCategorySchema } from "../validations/subCategoryValidation.js";
import { allowedUsers, userAuth } from "../../middlewares/userAuth.js";

export const subCategoryRouter = new Router({ mergeParams: true });


subCategoryRouter
  .route('/')
  .post(userAuth, allowedUsers('admin'), SchemaValidation(createSubCategorySchema), addSubCategory)
  .get(getAllSubCategories)


subCategoryRouter
  .route('/:id')
  .get(SchemaValidation(subCategoryIdSchema), getSubCategory)
  .put(userAuth, allowedUsers('admin'), SchemaValidation(updateSubCategorySchema), updateSubCategory)
  .delete(userAuth, allowedUsers('admin'), SchemaValidation(subCategoryIdSchema), deleteSubCategory)
