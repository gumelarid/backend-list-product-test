const multer = require('multer')
const { response } = require('../helpers/index')


// save to path .upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/")
    },

    // name file
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname)
    }
})

// set filter file
const fileFilter = (request, file, callback) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        callback(null, true);
    } else {
        return callback(new Error("Opps, please upload an image with a png or jpg file type"), false);
    }
};

// file size
const limits = { fileSize: 150 * 150 };

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
}).single("product_picture");

const uploadFilter = (req, res, next) => {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            return response(res, 400, error.message);
        } else if (error) {
            return response(res, 400, error.message);
        }
        next();
    });
};

module.exports = uploadFilter;