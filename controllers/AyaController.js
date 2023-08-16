
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
        if (req.files && req.files.aadharCardImage && req.files.aadharCardImage.length > 0) {
            item = { ...item, ['aadharCardImage']: req.files.aadharCardImage[0].path};
        }
    
        // Check if ID Card Images were uploaded
        if (req.files && req.files.idCardImage && req.files.idCardImage.length > 0) {
            item = { ...item, ['idCardImage']: req.files.idCardImage[0].path };
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




// exports.updateAssignedDetail = async function (req, res) {
//     try {
//         console.log(req.body)
//         let oldItem = req.body
//         let filter = { _id: req.body.id }
//         let assignedLength = oldItem.assignedCustomerDetails.length();
//         let replaceLength = oldItem.assignedCustomerDetails[assignedLength-1].replaceCustomerDetails.length();
//         // let obj = { ...oldItem, ['last_updated_by']: req.user._id }
//         await AyaReg.findOneAndUpdate(filter, { new: true });

//         if(req.query.index){
//             // let generatedCustomerId = 'customerGeneratedInvoice.' + req.query.index + '.generatedCustomerId'
//             // let generatedDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedDate'
//             // let generatedTime = 'customerGeneratedInvoice.' + req.query.index + '.generatedTime'
//             // let generatedPaymentMode = 'customerGeneratedInvoice.' + req.query.index + '.generatedPaymentMode'
//             // let generatedTransactionId = 'customerGeneratedInvoice.' + req.query.index + '.generatedTransactionId'
//             // let generatedUpi = 'customerGeneratedInvoice.' + req.query.index + '.generatedUpi'
//             // let generatedTransactionDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedTransactionDate'

//             // let generatedBill = 'customerGeneratedInvoice.' + req.query.index + '.generatedBill'
//             // let generatedToDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedToDate'
//             // let generatedFromDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedFromDate'
//             // let generatedRate = 'customerGeneratedInvoice.' + req.query.index + '.generatedRate'
//             // let generatedAyaAssigned = 'customerGeneratedInvoice.' + req.query.index + '.generatedAyaAssigned'
//             // let generatedAyaPurpose = 'customerGeneratedInvoice.' + req.query.index + '.generatedAyaPurpose'
//             // let generatedWorkingDays = 'customerGeneratedInvoice.' + req.query.index + '.generatedWorkingDays'
//             // let generatedLeaveTaken = 'customerGeneratedInvoice.' + req.query.index + '.generatedLeaveTaken'

//             // let replaceAyaFromDate = 'customerGeneratedInvoice.' + req.query.index + '.replaceAyaFromDate'
//             let replaceAyaFromDate = 'assignedCustomerDetails.' + assignedLength + '.replaceCustomerDetails.' + replaceLength + '.replaceAyaFromDate'
//             let replaceAyaToDate = 'assignedCustomerDetails.' + assignedLength + '.replaceCustomerDetails.' + replaceLength + '.replaceAyaToDate'


//             await AyaReg.$push({
//                         [replaceAyaToDate] : req.body.replaceAyaToDate,
//                         [replaceAyaFromDate] : req.body.replaceAyaFromDate

//                     }
//             )
//         }


//         res.status(200).send({ "status": "OK" })
//     } catch (e) {
//         res.status(500).send({ "status": "Failed", "message": e.message })
//     }
// };



exports.updateAyaBill = async function (req, res) {
    try {
        console.log(req.body)
        let oldItem = req.body
        let filter = { _id: req.body.id }
        // let obj = { ...oldItem, ['last_updated_by']: req.user._id }
        await AyaReg.findOneAndUpdate(filter, { new: true });

        if(req.query.index){
            let generatedAyaId = 'ayaGeneratedInvoice.' + req.query.index + '.generatedAyaId'
            let generatedDate = 'ayaGeneratedInvoice.' + req.query.index + '.generatedDate'
            let generatedTime = 'ayaGeneratedInvoice.' + req.query.index + '.generatedTime'
            let generatedPaymentMode = 'ayaGeneratedInvoice.' + req.query.index + '.generatedPaymentMode'
            let generatedTransactionId = 'ayaGeneratedInvoice.' + req.query.index + '.generatedTransactionId'
            let generatedUpi = 'ayaGeneratedInvoice.' + req.query.index + '.generatedUpi'
            let generatedTransactionDate = 'ayaGeneratedInvoice.' + req.query.index + '.generatedTransactionDate'

            let generatedBill = 'ayaGeneratedInvoice.' + req.query.index + '.generatedBill'
            let generatedToDate = 'ayaGeneratedInvoice.' + req.query.index + '.generatedToDate'
            let generatedFromDate = 'ayaGeneratedInvoice.' + req.query.index + '.generatedFromDate'
            let generatedRate = 'ayaGeneratedInvoice.' + req.query.index + '.generatedRate'
            let generatedCustomerAssigned = 'ayaGeneratedInvoice.' + req.query.index + '.generatedCustomerAssigned'
            let generatedCustomerPurpose = 'ayaGeneratedInvoice.' + req.query.index + '.generatedCustomerPurpose'
            let generatedWorkingDays = 'ayaGeneratedInvoice.' + req.query.index + '.generatedWorkingDays'
            let generatedLeaveTaken = 'ayaGeneratedInvoice.' + req.query.index + '.generatedLeaveTaken'
            await AyaReg.findOneAndUpdate(
                { "_id": req.body.id },
                { 
                    "$set": 
                        { 
                            [generatedAyaId] : req.body.generatedAyaId,
                            [generatedDate] : req.body.generatedDate,
                            [generatedTime] : req.body.generatedTime,
                            [generatedPaymentMode] : req.body.generatedPaymentMode,
                            [generatedTransactionId] : req.body.generatedTransactionId,
                            [generatedUpi] : req.body.generatedUpi,
                            [generatedTransactionDate] : req.body.generatedTransactionDate,
                            [generatedBill] : req.body.generatedBill,
                            [generatedToDate] : req.body.generatedToDate,
                            [generatedFromDate] : req.body.generatedFromDate,
                            [generatedRate] : req.body.generatedRate,
                            [generatedCustomerAssigned] : req.body.generatedCustomerAssigned,
                            [generatedCustomerPurpose] : req.body.generatedCustomerPurpose,
                            [generatedWorkingDays] : req.body.generatedWorkingDays,
                            [generatedLeaveTaken] : req.body.generatedLeaveTaken,

                        }
                }
            )
        }


        res.status(200).send({ "status": "OK" })
    } catch (e) {
        res.status(500).send({ "status": "Failed", "message": e.message })
    }
};

exports.updateAssignedDetail = async function (req, res) {
    try {
        console.log(req.body);
        let oldItem = req.body;
        let filter = { _id: req.body.id };
        // let replaceLength = assignedCustomerDetails
        // let obj = { ...oldItem, ['last_updated_by']: req.user._id }
        await AyaReg.findOneAndUpdate(filter, { new: true });
        // let replaceIndex = 

        if (req.query.index) {
            let assignedCustomerCode = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerCode';
            let assignedCustomerName = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerName';
            let assignedCustomerFromDate = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerFromDate';
            let assignedCustomerToDate = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerToDate';
            let assignedCustomerReason = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerReason';
            let assignedCustomerRate = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerRate';
            let assignedCustomerShift = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerShift';
            let assignedCustomerPurpose = 'assignedCustomerDetails.' + req.query.index + '.assignedCustomerPurpose';
            let replaceCustomerFromDate = 'assignedCustomerDetails.' + req.query.index + '.replaceCustomerDetails.' + req.body.replaceIndex + '.replaceCustomerFromDate';
            let replaceCustomerToDate = 'assignedCustomerDetails.' + req.query.index + '.replaceCustomerDetails.' + req.body.replaceIndex + '.replaceCustomerToDate';
            let replaceCustomerCode = 'assignedCustomerDetails.' + req.query.index + '.replaceCustomerDetails.' + req.body.replaceIndex + '.replaceCustomerCode';
            // let replaceCustomerDetails = 'assignedCustomerDetails.' + req.query.index + '.replaceCustomerDetails.';
            // let replaceLength = replaceCustomerDetails.length();
            // console.log(replaceLength);
    
            await AyaReg.findOneAndUpdate(
                {
                    "_id": req.body.id,
                    // [replaceCustomerFromDate]: { $exists: true }, // Make sure the field exists
                },
                {
                    "$set": {
                        [assignedCustomerCode]: req.body.assignedCustomerCode,
                        [assignedCustomerName]: req.body.assignedCustomerName,
                        [assignedCustomerFromDate]: req.body.assignedCustomerFromDate,
                        [assignedCustomerToDate]: req.body.assignedCustomerToDate,
                        [assignedCustomerReason]: req.body.assignedCustomerReason,
                        [assignedCustomerRate]: req.body.assignedCustomerRate,
                        [assignedCustomerShift]: req.body.assignedCustomerShift,
                        [assignedCustomerPurpose]: req.body.assignedCustomerPurpose,
                        [replaceCustomerFromDate]: req.body.replaceCustomerFromDate,
                        [replaceCustomerToDate]: req.body.replaceCustomerToDate,
                        [replaceCustomerCode]: req.body.replaceCustomerCode,

                    }
                }
            );
        }

        res.status(200).send({ "status": "OK" });
    } catch (e) {
        res.status(500).send({ "status": "Failed", "message": e.message });
    }
};





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
    else if(req.body.replaceCustomerToDate || req.body.replaceCustomerFromDate || req.body.replaceCustomerCode || req.body.assignedCustomerPurpose || req.body.assignedCustomerShift || req.body.assignedCustomerRate || req.body.assignedCustomerReason ||  req.body.assignedCustomerToDate || req.body.assignedCustomerFromDate || req.body.assignedCustomerName || req.body.assignedCustomerCode){
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
            replaceCustomerDetails : {  
                replaceCustomerCode:req.body.replaceCustomerCode,
                replaceCustomerFromDate: req.body.replaceCustomerFromDate,
                replaceCustomerToDate: req.body.replaceCustomerToDate,
            },
        },
        }
    }
    else if (req.body.generatedLeaveTaken || req.body.generatedWorkingDays || req.body.generatedAmountPaid || req.body.generatedCustomerPurpose || req.body.generatedBill || req.body.generatedTime || req.body.generatedToDate || req.body.generatedFromDate || req.body.generatedRate || req.body.generatedAyaId) {
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




exports.insertReplaceCustomerDetails = async function (req, res) {
    try {
        const ayaId = req.params.ayaId;
        const index = req.params.index;

        const replaceCustomerDetails = req.body.replaceCustomerDetails; // Array of objects to be pushed

        // Find the document by its ID
        const aya = await AyaReg.findById(ayaId);
        
        if (!aya) {
            return res.status(404).send({ "status": "Failed", "message": "Aya not found." });
        }

        // Check if the assignedCustomerDetails array element exists at the given index
        if (index >= aya.assignedCustomerDetails.length) {
            return res.status(404).send({ "status": "Failed", "message": "Assigned customer details not found at the given index." });
        }

        // Push the new array of objects into the replaceCustomerDetails array
        aya.assignedCustomerDetails[index].replaceCustomerDetails.push(...replaceCustomerDetails);

        // Save the updated document
        await aya.save();

        res.status(200).send({ "status": "OK", "message": "replaceCustomerDetails updated successfully." });
    } catch (e) {
        res.status(500).send({ "status": "Failed", "message": e.message });
    }
};

exports.updateReplaceCustomerDetails = async function (req, res) {
    try {
      const { ayaId, customerIndex, replaceCustomerIndex,replaceCustomerName, replaceCustomerCode, replaceCustomerFromDate,replaceCustomerToDate } = req.body;
  
      // Find the customer document by customerId
      const aya = await AyaReg.findById(ayaId);
  
      if (!aya) {
        return res.status(404).send({ status: 'Failed', message: 'Aya not found' });
      }
  
      // Check if the given ayaIndex and replaceAyaIndex are within the array bounds
      if (customerIndex >= 0 && customerIndex < aya.assignedCustomerDetails.length) {
        const assignedCustomer = aya.assignedCustomerDetails[customerIndex];
  
        if (replaceCustomerIndex >= 0 && replaceCustomerIndex < assignedCustomer.replaceCustomerDetails.length) {
          // Update the fields in the replaceAyaDetails array
          assignedCustomer.replaceCustomerDetails[replaceCustomerIndex].replaceCustomerCode = replaceCustomerCode;
          assignedCustomer.replaceCustomerDetails[replaceCustomerIndex].replaceCustomerName = replaceCustomerName;
          assignedCustomer.replaceCustomerDetails[replaceCustomerIndex].replaceCustomerFromDate = replaceCustomerFromDate;
          assignedCustomer.replaceCustomerDetails[replaceCustomerIndex].replaceCustomerToDate = replaceCustomerToDate;
  
  
          // Save the updated customer document
          await customer.save();
  
          return res.status(200).send({ status: 'OK', message: 'Replace Customer details updated successfully' });
        }
      }
  
      return res.status(400).send({ status: 'Failed', message: 'Invalid CustomerIndex or replaceCustomerIndex' });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error.message });
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



exports.deleteAyaBill = async(req,res)=>{
    try{
        const AyaId = req.params.ayaId;
        const index = parseInt(req.params.index);
        
        // fetch the aya data ;

        const Aya =  await AyaReg.findById(AyaId);

        if(!Aya){
            return res.status(404).json({status : "Failed" , message : "Aya not found in db."})
        }

        if(index < 0 || index >= Aya.ayaGeneratedInvoice.length){
            return res.status(404).json({status : "Failed", message : "index not found or Invalid Index" })
        }

        Aya.ayaGeneratedInvoice.splice(index,1);

        await Aya.save();

        res.status(200).json({ status : "Success",message:"Bill deleted Successfully"})

    } catch(err){
        res.status(500).json({ status : "Failed", message : err.message})
    }
}
