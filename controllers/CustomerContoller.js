const { default: mongoose } = require('mongoose');
const CustomerReg = require('../models/CustomerReg')
const fs = require('fs');
const { doesNotMatch } = require('assert');
const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


// upload a image









// GET /CustomerReg - Get all CustomerReg entries
exports.getAllCustomerRegEntries = async (req, res) => {
    try {
        const entries = await CustomerReg.find();
        res.status(200).json({
            succes: true, count: entries.length, message: "Succesfull", data: entries
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};









// latest one which we comment

// exports.createCustomerRegEntry = async (req, res) => {

//     try {

//         let item = req.body
//         if (req.files && req.files.file && req.files.file.length > 0) {
//             item = { ...item, ['file']: req.files.file[0].path }
//         }

//         const newCustomer = new CustomerReg(item)
//         const savedCustomer = await newCustomer.save()



//         res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer })
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ success: false, message: 'URL already exists' })
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
//             console.log(err)
//         }
//     }
// }


exports.createCustomerRegEntry = async (req, res) => {

    try {

        let item = req.body
        if (req.files && req.files.file && req.files.file.length > 0) {
            item = { ...item, ['file']: req.files.file[0].path }
        }
        // if (req.files && req.files.aadharCardImage && req.files.aadharCardImage.length > 0) {
        //     item = { ...item, ['aadharCardImage']: req.files.aadharCardImage[0].path};
        // }
    
        // Check if ID Card Images were uploaded
        if (req.files && req.files.idCardImage && req.files.idCardImage.length > 0) {
            item = { ...item, ['idCardImage']: req.files.idCardImage[0].path };
        }

        const newCustomer = new CustomerReg(item)
        const savedCustomer = await newCustomer.save()



        res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'URL already exists' })
        } else {
            res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' })
            console.log(err)
        }
    }
}


// exports.createCustomerRegEntry = async (req, res) => {
//     try {
//         let item = req.body;

//         // Check if payment details are provided
//         if (item.customerPayment && Array.isArray(item.customerPayment)) {
//             // Validate and clean up the payment details array
//             item.customerPayment = item.customerPayment.map((payment) => {
//                 return {
//                     customerBill: payment.customerBill || '0',
//                     amountReceived: payment.amountReceived || '0'
//                 };
//             });
//         }

//         if (req.files && req.files.file && req.files.file.length > 0) {
//             item = { ...item, file: req.files.file[0].path };
//         }

//         const newCustomer = new CustomerReg(item);
//         const savedCustomer = await newCustomer.save();

//         res.status(200).json({ success: true, message: 'Successfully created', data: savedCustomer });
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ success: false, message: 'URL already exists' });
//         } else {
//             res.status(500).json({ success: false, message: 'Failed to create. Please try again later.' });
//             console.log(err);
//         }
//     }
// };








// GET /CustomerReg/:id - Get an CustomerReg entry by ID
exports.getCustomerRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("backend id",id)

        // console.log(id)
        // let entry
        if (isValidObjectId(id)) {
            entry = await CustomerReg.findOne({ _id: id });

        } else {
            entry = await CustomerReg.findOne({ customerCode: id });
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

// exports.getCustomerInvoiceEntryById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("backend id",id)
//         // let entry
//         if (isValidObjectId(id)) {
//             entry = await CustomerReg.findOne({ _id: id });

//         } else {
//             entry = await CustomerReg.findOne({ customerCode: id });
//         }

//         if (!entry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }
//         // res.status(200).json(entry);
//         res.status(200).json({ succes: true, count: entry.length, message: "Success", data: entry });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };



// exports.getCustomerRegEntry = async (req, res) => {
//     try {
//         const { name, code } = req.params;
//         let query = {};


//         if (name) {
//             query.name = name;
//         }
//         if (code) {
//             query.code = code;
//         }

//         const entry = await CustomerReg.findOne(query);

//         if (!entry) {
//             return res.status(404).json({ error: 'Entry not found' });
//         }

//         res.status(200).json({ success: true, data: entry });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };





// exports.updateCustomerRegEntryBy = async (req, res) => {
//     const id = req.params.id
//     try {
//         const updatedEntry = await CustomerReg.findByIdAndUpdate(id, {
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





// exports.updateCustomerRegEntryById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updatedEntry = await CustomerReg.findByIdAndUpdate(
//             id,
//             {
//                 $set: req.body,
//                 $push: {
//                     customerpayment: {
//                         customerbill: req.body.customerbill,
//                         amount_received: req.body.amount_received,
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
// }

exports.updateCustomerBill = async function (req, res) {
    try {
        console.log(req.body)
        let oldItem = req.body
        let filter = { _id: req.body.id }
        // let obj = { ...oldItem, ['last_updated_by']: req.user._id }
        await CustomerReg.findOneAndUpdate(filter, { new: true });

        if(req.query.index){
            let generatedCustomerId = 'customerGeneratedInvoice.' + req.query.index + '.generatedCustomerId'
            let generatedDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedDate'
            let generatedTime = 'customerGeneratedInvoice.' + req.query.index + '.generatedTime'
            let generatedPaymentMode = 'customerGeneratedInvoice.' + req.query.index + '.generatedPaymentMode'
            let generatedTransactionId = 'customerGeneratedInvoice.' + req.query.index + '.generatedTransactionId'
            let generatedUpi = 'customerGeneratedInvoice.' + req.query.index + '.generatedUpi'
            let generatedTransactionDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedTransactionDate'

            let generatedBill = 'customerGeneratedInvoice.' + req.query.index + '.generatedBill'
            let generatedToDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedToDate'
            let generatedFromDate = 'customerGeneratedInvoice.' + req.query.index + '.generatedFromDate'
            let generatedRate = 'customerGeneratedInvoice.' + req.query.index + '.generatedRate'
            let generatedAyaAssigned = 'customerGeneratedInvoice.' + req.query.index + '.generatedAyaAssigned'
            let generatedAyaPurpose = 'customerGeneratedInvoice.' + req.query.index + '.generatedAyaPurpose'
            let generatedWorkingDays = 'customerGeneratedInvoice.' + req.query.index + '.generatedWorkingDays'
            let generatedLeaveTaken = 'customerGeneratedInvoice.' + req.query.index + '.generatedLeaveTaken'
            await CustomerReg.findOneAndUpdate(
                { "_id": req.body.id },
                { 
                    "$set": 
                        { 
                            [generatedCustomerId] : req.body.generatedCustomerId,
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
                            [generatedAyaAssigned] : req.body.generatedAyaAssigned,
                            [generatedAyaPurpose] : req.body.generatedAyaPurpose,
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
        console.log(req.body)
        let oldItem = req.body
        let filter = { _id: req.body.id }
        // let obj = { ...oldItem, ['last_updated_by']: req.user._id }
        await CustomerReg.findOneAndUpdate(filter, { new: true });

        if(req.query.index){
            let assignedAyaCode = 'assignedAyaDetails.' + req.query.index + '.assignedAyaCode'
            let assignedAyaName = 'assignedAyaDetails.' + req.query.index + '.assignedAyaName'
            let assignedAyaFromDate = 'assignedAyaDetails.' + req.query.index + '.assignedAyaFromDate'
            let assignedAyaToDate = 'assignedAyaDetails.' + req.query.index + '.assignedAyaToDate'
            let assignedAyaReason = 'assignedAyaDetails.' + req.query.index + '.assignedAyaReason'
            let assignedAyaRate = 'assignedAyaDetails.' + req.query.index + '.assignedAyaRate'
            let assignedAyaShift = 'assignedAyaDetails.' + req.query.index + '.assignedAyaShift'

            let assignedAyaPurpose = 'assignedAyaDetails.' + req.query.index + '.assignedAyaPurpose' 
    
            await CustomerReg.findOneAndUpdate(
                { "_id": req.body.id },
                { 
                    "$set": 
                        { 
                            [assignedAyaCode] : req.body.assignedAyaCode,
                            [assignedAyaName] : req.body.assignedAyaName,
                            [assignedAyaFromDate] : req.body.assignedAyaFromDate,
                            [assignedAyaToDate] : req.body.assignedAyaToDate,
                            [assignedAyaReason] : req.body.assignedAyaReason,
                            [assignedAyaRate] : req.body.assignedAyaRate,
                            [assignedAyaShift] : req.body.assignedAyaShift,
                            [assignedAyaPurpose] : req.body.assignedAyaPurpose,
                        }
                }
            )
        }


        res.status(200).send({ "status": "OK" })
    } catch (e) {
        res.status(500).send({ "status": "Failed", "message": e.message })
    }
};



exports.updateCustomerRegEntryById = async (req, res) => {
    const id = req.params.id;
    // if(req.body.createNewEntry === true){
        const updateData = { $set: req.body };

        if (req.body.paymentPendingAmount ||  req.body.paymentBalance || req.body.paymentstatus || req.body.paymentLeaveTaken || req.body.paymentWorkingDays || req.body.paymentAmountReceived ||  req.body.paymentAyaPurpose||req.body.paymentAyaAssigned || req.body.paymentBill || req.body.paymentToDate || req.body.paymentFromDate || req.body.paymentRate) {
            updateData.$push = {
                customerPaymentDetails: {
                    paymentBill: req.body.paymentBill,
                    paymentAmountReceived: req.body.paymentAmountReceived,
                    paymentFromDate: req.body.paymentFromDate,
                    paymentToDate: req.body.paymentToDate,
                    paymentAyaAssigned: req.body.paymentAyaAssigned,
                    paymentRate: req.body.paymentRate,
                    paymentAyaPurpose: req.body.paymentAyaPurpose,
                    paymentLeaveTaken: req.body.paymentLeaveTaken,
                    paymentWorkingDays: req.body.paymentWorkingDays,
                    paymentstatus: req.body.paymentstatus,
                    paymentBalance : req.body.paymentBalance,
                    paymentPendingAmount : req.body.paymentPendingAmount,
    
                },
            };
        }
        
        
        else if (req.body.generatedDate || req.body.generatedPaymentMode || req.body.generatedTransactionId ||req.body.generatedUpi ||req.body.generatedTransactionDate || req.body.generatedLeaveTaken || req.body.generatedWorkingDays || req.body.generatedAmountReceived || req.body.generatedAyaPurpose || req.body.generatedBill || req.body.generatedTime || req.body.generatedToDate || req.body.generatedFromDate || req.body.generatedRate || req.body.generatedCustomerId) {
            updateData.$push = {
                customerGeneratedInvoice: {
                    generatedCustomerId : req.body.generatedCustomerId, 
                    generatedTime : req.body.generatedTime,
                    generatedBill: req.body.generatedBill,
                    generatedToDate : req.body.generatedToDate,
                    generatedFromDate : req.body.generatedFromDate,
                    generatedRate : req.body.generatedRate,
                    generatedAyaAssigned : req.body.generatedAyaAssigned,
                    generatedAyaPurpose : req.body.generatedAyaPurpose,
                    generatedAmountReceived : req.body.generatedAmountReceived,
                    generatedWorkingDays : req.body.generatedWorkingDays,
                    generatedLeaveTaken : req.body.generatedLeaveTaken,
                    generatedDate : req.body.generatedDate,
                    generatedPaymentMode : req.body.generatedPaymentMode,
                    generatedTransactionId : req.body.generatedTransactionId,
                    generatedUpi : req.body.generatedUpi,
                    generatedTransactionDate : req.body.generatedTransactionDate,
    
                },
            };
        }
    
        else if(req.body.replaceAyaToDate || req.body.replaceAyaFromDate || req.body.replaceAyaCode || req.body.assignedAyaPurpose || req.body.assignedAyaShift || req.body.assignedAyaRate || req.body.assignedAyaReason ||  req.body.assignedAyaToDate || req.body.assignedAyaFromDate || req.body.assignedAyaName || req.body.assignedAyaCode){
            updateData.$push = {
            assignedAyaDetails:{
                assignedAyaCode : req.body.assignedAyaCode,
                assignedAyaName : req.body.assignedAyaName, 
                assignedAyaFromDate : req.body.assignedAyaFromDate, 
                assignedAyaToDate : req.body.assignedAyaToDate, 
                assignedAyaReason : req.body.assignedAyaReason,
                assignedAyaRate  : req.body.assignedAyaRate, 
                assignedAyaShift : req.body.assignedAyaShift, 
                assignedAyaPurpose : req.body.assignedAyaPurpose, 
                replaceAyaDetails : {
                    replaceAyaCode:req.body.replaceAyaCode,
                    replaceAyaFromDate: req.body.replaceAyaFromDate,
                    replaceAyaToDate: req.body.replaceAyaToDate,
                },
            },
            }
        }
        else if( req.body.totalPendingAmount ){
            updateData.$push = {
                totalPendingAmount : req.body.totalPendingAmount
            }
        }
    
    // } else{
    //     const updateData = { $set: req.body };
    //         if (req.body.generatedDate || req.body.generatedPaymentMode || req.body.generatedTransactionId ||req.body.generatedUpi ||req.body.generatedTransactionDate || req.body.generatedLeaveTaken || req.body.generatedWorkingDays || req.body.generatedAmountReceived || req.body.generatedAyaPurpose || req.body.generatedBill || req.body.generatedTime || req.body.generatedToDate || req.body.generatedFromDate || req.body.generatedRate || req.body.generatedCustomerId) {
    //         updateData.$set = {
    //             customerGeneratedInvoice: {
    //                 generatedCustomerId : req.body.generatedCustomerId, 
    //                 generatedTime : req.body.generatedTime,
    //                 generatedBill: req.body.generatedBill,
    //                 generatedToDate : req.body.generatedToDate,
    //                 generatedFromDate : req.body.generatedFromDate,
    //                 generatedRate : req.body.generatedRate,
    //                 generatedAyaAssigned : req.body.generatedAyaAssigned,
    //                 generatedAyaPurpose : req.body.generatedAyaPurpose,
    //                 generatedAmountReceived : req.body.generatedAmountReceived,
    //                 generatedWorkingDays : req.body.generatedWorkingDays,
    //                 generatedLeaveTaken : req.body.generatedLeaveTaken,
    //                 generatedDate : req.body.generatedDate,
    //                 generatedPaymentMode : req.body.generatedPaymentMode,
    //                 generatedTransactionId : req.body.generatedTransactionId,
    //                 generatedUpi : req.body.generatedUpi,
    //                 generatedTransactionDate : req.body.generatedTransactionDate,
    
    //             },
    //         };
    //         }
    //     }

    try {
        const updatedEntry = await CustomerReg.findByIdAndUpdate(
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
}

// operation on replaced assigned aya 

exports.insertReplaceAyaDetails = async function (req, res) {
    // console.log('req.body',req.body.replaceAyaDetails);
    // console.log('usomerr id',req.params.customerId);
    // console.log('index',req.params.index);
    try {
        const customerId = req.params.customerId;
        const index = req.params.index;
        const replaceAyaDetails = req.body.replaceAyaDetails; // Array of objects to be pushed

        // Find the document by its ID
        const Customer = await CustomerReg.findById(customerId);
        
        if (!Customer) {
            return res.status(404).send({ "status": "Failed", "message": "Customer not found." });
        }

        // Check if the assignedCustomerDetails array element exists at the given index
        if (index >= Customer.assignedAyaDetails.length) {
            return res.status(404).send({ "status": "Failed", "message": "Assigned customer details not found at the given index." });
        }

        // Push the new array of objects into the replaceCustomerDetails array
        Customer.assignedAyaDetails[index].replaceAyaDetails.push(...replaceAyaDetails);

        // Save the updated document
        await Customer.save();

        res.status(200).send({ "status": "OK", "message": "replaceCustomerDetails updated successfully." });
    } catch (e) {
        res.status(500).send({ "status": "Failed", "message": e.message });
    }
};



exports.updateReplaceAyaDetails = async function (req, res) {
  try {
    const { customerId, ayaIndex, replaceAyaIndex, replaceAyaName,replaceAyaCode, replaceAyaFromDate,replaceAyaToDate } = req.body;

    // Find the customer document by customerId
    const customer = await CustomerReg.findById(customerId);

    if (!customer) {
      return res.status(404).send({ status: 'Failed', message: 'Customer not found' });
    }

    // Check if the given ayaIndex and replaceAyaIndex are within the array bounds
    if (ayaIndex >= 0 && ayaIndex < customer.assignedAyaDetails.length) {
      const assignedAya = customer.assignedAyaDetails[ayaIndex];

      if (replaceAyaIndex >= 0 && replaceAyaIndex < assignedAya.replaceAyaDetails.length) {
        // Update the fields in the replaceAyaDetails array
        assignedAya.replaceAyaDetails[replaceAyaIndex].replaceAyaCode = replaceAyaCode;
        assignedAya.replaceAyaDetails[replaceAyaIndex].replaceAyaFromDate = replaceAyaFromDate;
        assignedAya.replaceAyaDetails[replaceAyaIndex].replaceAyaToDate = replaceAyaToDate;
        assignedAya.replaceAyaDetails[replaceAyaIndex].replaceAyaName = replaceAyaName;



        // Save the updated customer document
        await customer.save();

        return res.status(200).send({ status: 'OK', message: 'Replace Aya details updated successfully' });
      }
    }

    return res.status(400).send({ status: 'Failed', message: 'Invalid ayaIndex or replaceAyaIndex' });
  } catch (error) {
    res.status(500).send({ status: 'Failed', message: error.message });
  }
};

// operation on generated Bill

exports.deleteCustomerBill = async(req,res)=>{
    try{
        const customerId = req.params.customerId;
        const index = parseInt(req.params.index);
        
        // fetch the customer data ;

        const customer =  await CustomerReg.findById(customerId);

        if(!customer){
            return res.status(404).json({status : "Failed" , message : "Customer not found in db."})
        }

        if(index < 0 || index >= customer.customerGeneratedInvoice.length){
            return res.status(404).json({status : "Failed", message : "index not found or Invalid Index" })
        }

        customer.customerGeneratedInvoice.splice(index,1);

        await customer.save();

        res.status(200).json({ status : "Success",message:"Bill deleted Successfully"})

    } catch(err){
        res.status(500).json({ status : "Failed", message : err.message})
    }
}



// in thsese if we upadate the field then this is always  push the customerpayment do in thse if we update the field don't push customerpayment otherwise they push the data









// DELETE /CustomerReg/:id - Delete an CustomerReg entry by ID
exports.deleteCustomerRegEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await CustomerReg.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        // res.status(204).end();
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};














// we enter this data using thies api http://localhost:8109/customerreg/6468a9ecc6c5644810f8c860




