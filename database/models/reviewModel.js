import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required.'],
    min: [1, 'Rating must be between 1 and 5.'],
    max: [5, 'Rating must be between 1 and 5.']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required.'],
    trim: true
  },
}, {
  timestamps: true
});

reviewSchema.pre(/^find/, function () {
  this.populate('user', 'username')
})

export const reviewModel = mongoose.model('Review', reviewSchema);
