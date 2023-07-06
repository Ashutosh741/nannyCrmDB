// Define the storage configuration for multer to specify where to store the uploaded images and how to name them. You can define a storage object and pass it to the multer middleware:

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname; // Generate a unique file name
        cb(null, fileName);
    }
});

const upload = multer({ storage });