import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters.'],
    maxlength: [50, 'Name cannot exceed 50 characters.']
  },
  slug: {
    type: String,
    lowercase: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref:"category"
  }
}, { timestamps: true })

export const subCategoryModel = mongoose.model('subCategory', subCategorySchema);