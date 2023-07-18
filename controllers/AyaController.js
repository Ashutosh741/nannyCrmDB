
const AyaReg = require('../models/AyaReg');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

// GET /ayareg - Get all AyaReg entries
exports.getAllAyaRegEntries = async (req, res) => {
    try {
        const entries = await AyaReg.find();
        res.status(200).json({
            succes: true, count: entries.length, message: "Succesfull", data: entries
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.getAllAyaRegEntries = async (req, res) => {
//     try {
//         const entries = await AyaReg.find();
//         const customerEntries = await CustomerReg.find();
//         res.status(200).json({
//             success: true,
//             count: entries.length,
//             message: "Successful",
//             data: { entries: entries, customerEntries: customerEntries },
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };





// old one for without image

// exports.createAyaRegEntry = async (req, res) => {
//     const newAya = new AyaReg(req.body)
//     try {
//         const savedAya = await newAya.save()
//         res.status(200).json({ success: true, message: 'Successfully created', data: savedAya })
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ success: false, message: 'URL already exists' })
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
//             console.log(err)
//         }
//     }
// }


// new CreateAya Entry with image

exports.createAyaRegEntry = async (req, res) => {
    try {
        let item = req.body
        if (req.files && req.files.file && req.files.file.length > 0) {
            item = { ...item, ['file']: req.files.file[0].path }
        }

        const newAya = new AyaReg(item)
        const savedAya = await newAya.save()
        res.status(200).json({ success: true, message: 'Successfully created', data: savedAya })
    } catch (err) {

        if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'URL already exists' })
        } else {
            res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
            console.log(err)
        }
    }
}













// GET /ayareg/:id - Get an AyaReg entry by ID


exports.getAyaRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        // let entry
        if (isValidObjectId(id)) {
            entry = await AyaReg.findOne({ _id: id });

        } else {
            entry = await AyaReg.findOne({ ayaCode: id });
        }

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // res.status(200).json(entry);
        res.status(200).json({ succes: true, count: entry.length, message: "Success", data: entry });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};



// exports.getAyaRegEntryById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const entry = await AyaReg.findById(id);
//         if (!entry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }
//         // res.status(200).json(entry);
//         res.status(200).json({ succes: true, count: entry.length, message: "Success", data: entry });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// PUT /ayareg/:id - Update an AyaReg entry by ID
// exports.updateAyaRegEntryById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         // const { name, age, gender } = req.body;
//         const updatedEntry = await AyaReg.findByIdAndUpdate(
//             id,
//             // { name, age, gender },
//             // { new: true }
//         );
//         if (!updatedEntry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }
//         // res.status(200).json(updatedEntry);
//         res.status(200).json({ succes: true, message: 'Successfully Update', data: updatedEntry })
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// exports.updateAyaRegEntryById = async (req, res) => {
//     const id = req.params.id
//     try {
//         const updatedEntry = await AyaReg.findByIdAndUpdate(id, {
//             $set: req.body
//         }, { new: true })
//         if (!updatedEntry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ succes: true, message: 'Successfully Update', data: updatedEntry })
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Failed to update' })
//     }
// }






exports.updateAyaRegEntryById = async (req, res) => {
    const id = req.params.id;
    const updateData = { $set: req.body };
    if (req.body.paymentPendingAmount || req.body.paymentBalance || req.body.paymentstatus || req.body.paymentLeaveTaken || req.body.paymentWorkingDays || req.body.paymentAmountReceived ||  req.body.paymentCustomerPurpose||req.body.paymentCustomerAssigned || req.body.paymentBill || req.body.paymentToDate || req.body.paymentFromDate || req.body.paymentRate) {
        updateData.$push = {
            ayaPaymentDetails: {
                paymentBill: req.body.paymentBill,
                paymentAmountReceived: req.body.paymentAmountReceived,
                paymentFromDate: req.body.paymentFromDate,
                paymentToDate: req.body.paymentToDate,
                paymentCustomerAssigned: req.body.paymentCustomerAssigned,
                paymentRate: req.body.paymentRate,
                paymentCustomerPurpose: req.body.paymentCustomerPurpose,
                paymentLeaveTaken: req.body.paymentLeaveTaken,
                paymentWorkingDays: req.body.paymentWorkingDays,
                paymentstatus: req.body.paymentstatus,
                paymentBalance : req.body.paymentBalance,
                // paymentPendingAmount
                paymentPendingAmount : req.body.paymentPendingAmount,

            },
        };
    }
    else if(req.body.assignedCustomerPurpose || req.body.assignedCustomerShift || req.body.assignedCustomerRate || req.body.assignedCustomerReason ||  req.body.assignedCustomerToDate || req.body.assignedCustomerFromDate || req.body.assignedCustomerName || req.body.assignedCustomerCode){
        updateData.$push = {
        assignedCustomerDetails:{
            assignedCustomerCode : req.body.assignedCustomerCode,
            assignedCustomerName : req.body.assignedCustomerName, 
            assignedCustomerFromDate : req.body.assignedCustomerFromDate, 
            assignedCustomerToDate : req.body.assignedCustomerToDate, 
            assignedCustomerReason : req.body.assignedCustomerReason,
            assignedCustomerRate  : req.body.assignedCustomerRate, 
            assignedCustomerShift : req.body.assignedCustomerShift, 
            assignedCustomerPurpose : req.body.assignedCustomerPurpose, 
        },
        }
    }
    else if ( req.body.generatedLeaveTaken || req.body.generatedWorkingDays || req.body.generatedAmountPaid || req.body.generatedCustomerPurpose || req.body.generatedBill || req.body.generatedTime || req.body.generatedToDate || req.body.generatedFromDate || req.body.generatedRate || req.body.generatedAyaId) {
        updateData.$push = {
            ayaGeneratedInvoice: {
                generatedAyaId : req.body.generatedAyaId, 
                generatedTime : req.body.generatedTime,
                generatedBill: req.body.generatedBill,
                generatedToDate : req.body.generatedToDate,
                generatedFromDate : req.body.generatedFromDate,
                generatedRate : req.body.generatedRate,
                generatedCustomerAssigned : req.body.generatedCustomerAssigned,
                generatedCustomerPurpose : req.body.generatedCustomerPurpose,
                generatedAmountReceived : req.body.generatedAmountPaid,
                generatedWorkingDays : req.body.generatedWorkingDays,
                generatedLeaveTaken : req.body.generatedLeaveTaken,
            },
        };
    }
    else if( req.body.pendingAmount ){
        updateData.$push = {
            pendingAmount : req.body.pendingAmount
        }
    }

    try {
        const updatedEntry = await AyaReg.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedEntry });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update' });
    }
};



// exports.updateAyaRegEntryById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updatedEntry = await AyaReg.findByIdAndUpdate(
//             id,
//             {
//                 $set: req.body,
//                 $push: {
//                     ayapayment: {
//                         customerbill: req.body.customerbill,
//                         paymentstatus: req.body.paymentstatus,
//                         ayapaid: req.body.ayapaid,
//                         profit: req.body.profit,
//                         month: req.body.month,
//                         paymentstatus: req.body.paymentstatus,
//                         balance: req.body.balance,
//                         currentdate: req.body.currentdate
//                     },
//                 },
//             },
//             { new: true }
//         );

//         if (!updatedEntry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ success: true, message: 'Successfully updated', data: updatedEntry });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Failed to update' });
//     }
// };


// DELETE /ayareg/:id - Delete an AyaReg entry by ID
exports.deleteAyaRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await AyaReg.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // res.status(204).end();
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

