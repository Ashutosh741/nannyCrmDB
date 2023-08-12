const express = require('express');
const { getAllAyaRegEntries, createAyaRegEntry,insertReplaceCustomerDetails,updateAssignedDetail,updateAyaBill,updateReplaceCustomerDetails, getAyaRegEntryById, updateAyaRegEntryById, deleteAyaRegEntryById } = require('../controllers/AyaController');

const { getAllCustomerRegEntries, updateReplaceAyaDetails,insertReplaceAyaDetails,createCustomerRegEntry,updateCustomerBill, updateCustomerRegEntryById, deleteCustomerRegEntryById, getCustomerRegEntryById, getCustomerCode, } = require('../controllers/CustomerContoller');

const { createBookingEntry, getAllBooking } = require('../controllers/BookController');
const { login, register } = require('../controllers/authController');
const md5 = require('md5')


const mime = require('mime')

const multer = require('multer');





// working image upload code

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "file") {
            cb(null, md5(Date.now()) + "." + mime.getExtension(file.mimetype));
        }
        if (file.fieldname === "aadharCardImage") {
            cb(null, md5(Date.now()) + "." + mime.getExtension(file.mimetype));
        }
        if (file.fieldname === "idCardImage") {
            cb(null, md5(Date.now()) + "." + mime.getExtension(file.mimetype));
        }

    },
});


const upload = multer({
    storage: storage,
}).fields(
    [

        {
            name: 'file', maxCount: 1

        },
        {
            name: 'aadharCardImage', maxCount: 1
            
        },
        {
            name: 'idCardImage', maxCount: 1
            
        },
    ]
);

const router = express.Router();










// GET /ayareg - Get all AyaReg entries
router.get('/ayareg', getAllAyaRegEntries);

// POST /ayareg - Create a new AyaReg entry

// router.post('/ayareg', createAyaRegEntry);

router.post('/ayareg', upload, createAyaRegEntry)




// GET /ayareg/:id - Get an AyaReg entry by ID
router.get('/ayareg/:id', getAyaRegEntryById);

// PUT /ayareg/:id - Update an AyaReg entry by ID
router.put('/ayareg/:id', updateAyaRegEntryById);

router.put('/updateAyaBill', updateAyaBill);



router.put('/updateAssignedDetail', updateAssignedDetail);


router.post('/insertReplaceCustomerDetails/:ayaId/:index',insertReplaceCustomerDetails);

router.put('/updateReplaceCustomerDetails', updateReplaceCustomerDetails);

// router.put('/updateAssignedDetail', updateAssignedDetail);



// router.put('/ayareg/:id/:generatedInvoice[index]', updateAyaRegEntryById);


// DELETE /ayareg/:id - Delete an AyaReg entry by ID
router.delete('/ayareg/:id', deleteAyaRegEntryById);




router.post('/insertReplaceAyaDetails/:customerId/:index',insertReplaceAyaDetails);

router.put('/updateReplaceAyaDetails', updateReplaceAyaDetails);

// customer Registration

router.get('/customerreg', getAllCustomerRegEntries);

router.post('/customerreg', upload, createCustomerRegEntry);

// router.post('/customerreg', upload.single('idProofImage'), createCustomerRegEntry);


// router.get('/customerreg/:customerCode', getCustomerCode)

router.get('/customerreg/:id', getCustomerRegEntryById);


router.put('/customerreg/:id', updateCustomerRegEntryById);

router.put('/updateCustomerBill', updateCustomerBill);

// router.put('/customerreg/:id', updateCustomerRegEntryBy);


router.delete('/customerreg/:id', deleteCustomerRegEntryById);




//Booking

router.post('/booking', createBookingEntry)

router.get('/booking', getAllBooking)


//login

router.post('/register', register)
router.post('/login', login)


// UPLOAD


// router.post('/upload', fileUpload({ createParentPath: true }),
//     filesPayloadExist,
//     fileExtLimiter(['.png', '.jpg', '.jpeg']),
//     fileSizeLimiter,

//     (req, res) => {
//         const files = req.files
//         console.log(files)

//         Object.keys(files).forEach(key => {
//             const filepath = path.join(__dirname, 'files', files[key].name)
//             files[key].mv(filepath, (err) => {
//                 if (err) {
//                     return res.status(500).json({ status: "error", message: err })
//                 }
//             })
//         })
//         return res.json({ status: "success", message: Object.keys(files).toString() })
//     })





module.exports = router;






