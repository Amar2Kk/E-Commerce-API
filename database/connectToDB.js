import mongoose from "mongoose";

export const connectToDB = async() => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB_CONNECTION, {
    dbName : 'ECommerce'
  })
    .then(() => console.log('Database connection established ✅\n'))
    .catch((err) => console.log('Database connection error ❗:', err))
}