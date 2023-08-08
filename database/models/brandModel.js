import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Name must be unique.'],
    required: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters.'],
    maxlength: [50, 'Name cannot exceed 50 characters.']
  },
  slug: {
    type: String,
    lowercase: true,
  },
  logo: {
    type: String,
  }
}, { timestamps: true })

brandSchema.post('init', (Doc) => {
  Doc.logo = `${process.env.BASE_URL}/brand/${Doc.logo}`
})

export const brandModel = mongoose.model('brand', brandSchema);