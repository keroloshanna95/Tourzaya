import multer from "multer";
import AppError from "../utils/appError.js";

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }      
};

const tourStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tours/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `tour-${Date.now()}.${extension}`);
    }
});

export const uploadTourImages = multer({
    storage: tourStorage,
    fileFilter
}).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);
