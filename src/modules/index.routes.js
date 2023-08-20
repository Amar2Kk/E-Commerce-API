import { AppError } from "../utils/errors/AppError.js"
import { addressRouter } from "./routes/addressRoutes.js"
import { authRouter } from "./routes/authRoutes.js"
import { brandRouter } from "./routes/brandRoutes.js"
import { categoryRouter } from "./routes/categoryRoutes.js"
import { productRouter } from "./routes/productRoutes.js"
import { reviewRouter } from "./routes/reviewRoutes.js"
import { subCategoryRouter } from "./routes/subCategoryRoutes.js"
import { userRouter } from "./routes/userRoutes.js"
import { wishlistRouter } from "./routes/wishlistRoutes.js"

export function serverRoutes(app) {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/categories', categoryRouter)
  app.use('/api/v1/subcategories', subCategoryRouter)
  app.use('/api/v1/brands', brandRouter)
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/reviews', reviewRouter)
  app.use('/api/v1/wishlists', wishlistRouter)
  app.use('/api/v1/addresses', addressRouter)

  app.get('/api/v1/', (req, res, next) => {
    res.send(`Welcome to the e-commerce API v1.0\n 
    Please refer back to the documentation page for the api endpoints.`)
  })

  app.get('/', (req, res,next) => {
    res.send('Hello, Welcome to the e-commerce API 🥳')
  })

  app.use('*', (req, res, next) => {
    next(new AppError(`invalid path - cant access ${req.originalUrl} endpoint.`, 404));
  })
  app.use((err, req, res, next) => {
    err.statusCode ? res.status(err.statusCode).json({ status: 'fail', Error: err.message }) : res.send({ status: 'fail', Error: err.message });
    console.log(`Error: ${err.message}`);
  })
}