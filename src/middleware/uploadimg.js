const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },


})
const maxSize = 2 * 1024 * 1024
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false)
            return cb(new Error('only .png, .jpg, .jpeg type allowed '))
        }
    },
    limits: { fileSize: maxSize }
})

module.exports = {
    uploadMulter: upload
}
