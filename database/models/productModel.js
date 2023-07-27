import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    unique: [true, 'Title must be unique.'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters.'],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required.'],
    minlength: [5, 'Description must be at least 2 characters.'],
    maxlength: [300, 'Description cannot exceed 50 characters.']
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: 0
  },
  priceAfterDiscount: {
    type: Number,
    min: 0
  },
  averageRating: {
    type: Number,
    min: [1, 'Average rating must be greater than 1'],
    max: [5, 'Average rating must be less than 5'],
  },
  ratingCount: {
    type: Number,
    default: 0,
    min: 0
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
    required: [true, 'Quantity is required.'],
  },
  sold: {
    type: Number,
    default: 0,
    min: 0,
  },
  coverImg: {
    type: String,
  },
  images: [String],
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: [true, 'Category is required.'],
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "subCategory",
    required: [true, 'Subdivision category is required.'],
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
    required: [true, 'Brand is required.'],
  },
}, { timestamps: true, toJSON: { virtuals: true } })


productSchema.post('init', (Doc) => {
  Doc.coverImg = `${process.env.BASE_URL}/product/${Doc.coverImg}`
  Doc.images = Doc.images.map((path => `${process.env.BASE_URL}/product/${path}`))
})

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
})

productSchema.pre(/^find/, function () {
  this.populate('reviews')
})
export const productModel = mongoose.model('product', productSchema);