import { ApiFeatures } from "../utils/ApiFeatures.js";
import { AppError } from "../utils/errors/AppError.js";
import { catchErrors } from "../utils/errors/catchAsyncError.js";

// export const create = (model, identifier) => {
//   return catchErrors(async (req, res, next) => {
//     const { name } = req.body
//     const Doc = await model.findOne({ name });
//     if (Doc) return next(new AppError(`${identifier} already exists`, 406));
//     if (req.body.name) req.body.slug = slugify(req.body.name);
//     if (req.body.image) req.body.image = req.file.filename
//     let newDoc = new model(req.body);
//     await newDoc.save();
//     res.status(201).json({
//       status: 'success',
//       data: {
//         Doc: newDoc,
//       },
//     });
//   });
// }

export const getAll = (model, identifier) => {
  return catchErrors(async (req, res, next) => {
    let filter = {}
    if (req.params.categoryId) {
      filter = { category: req.params.categoryId }
    }
    let apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .paginate()
      .filter()
      .sort()
      .search()
      .fields();
    const Doc = await apiFeatures.mongooseQuery;
    !Doc && next(new AppError(`No ${identifier}'s found.`, 404));
    Doc && res.status(200).json({
      status: 'success',
      page: apiFeatures.page,
      data: {
        Doc,
      },
    });
  });
}

export const getOne = (model, identifier) => {
  return catchErrors(async (req, res, next) => {
    const { id } = req.params;
    const Doc = await model.findById({ _id: id });
    !Doc && next(new AppError(`${identifier} not found.`, 404));
    Doc && res.status(200).json({
      status: 'success',
      data: {
        Doc
      },
    });
  });
}




export const deleteOne = (model, identifier) => {
  return catchErrors(async (req, res, next) => {
    const { id } = req.params;
    let deletedDoc = await model.findByIdAndDelete(id);
    !deletedDoc && next(new AppError(`${identifier} not found`, 404));
    deletedDoc && res.status(200).json({
      status: 'success',
      message: `${id} deleted successfully.`,
    });
  });
}