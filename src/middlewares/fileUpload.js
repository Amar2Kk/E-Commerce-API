import multer from "multer"
import { AppError } from "../utils/errors/AppError.js"


let uploadOptions = (FolderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${FolderName}`)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    },
  })
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new AppError('Invalid file type: ' + file.mimeType, 400), false)
    }
  }
  return multer({ storage, fileFilter })
}

export const uploadSingleFile = (fieldName, FolderName) => 
uploadOptions(FolderName).single(fieldName)



export const uploadManyFile = (fields, FolderName) => 
uploadOptions(FolderName).fields(fields)
