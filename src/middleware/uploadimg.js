const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './image')
    },
    filename: function (req, file, cb) {
        cb(null, '/' + new Date().getTime() + '-' + file.originalname)
    },

})
const maxSize = 2 * 1024 * 1024
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            const err = new Error("Uploaded file must be png, jpg or jpeg file");
            cb(err, false)
        }
    },
    limits: { fileSize: maxSize }
})
module.exports = {
    uploadMulter: upload
}
