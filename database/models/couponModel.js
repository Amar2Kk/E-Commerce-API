import mongoose from 'mongoose';


const couponSchema = new Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required.'],
    unique: true,
    trim: true
  },
  discount: {
    type: Number,
    required: [true, 'Discount amount is required.'],
    min: [0, 'Discount amount must be a positive number.']
  },
  validFrom: {
    type: Date,
    required: [true, 'Valid from date is required.']
  },
  validUntil: {
    type: Date,
    required: [true, 'Valid until date is required.']
  }
}, {timestamps: true});

export const couponModel = mongoose.model('Coupon', couponSchema);
