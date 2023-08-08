import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
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
  image: {
    type: String,
    trim: true
  }
}, { timestamps: true })

categorySchema.post('init', (Doc) => {
  Doc.image = `${process.env.BASE_URL}/category/${Doc.image}`
})
export const categoryModel = mongoose.model('Category', categorySchema);