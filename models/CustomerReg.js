const mongoose = require('mongoose')

// const customerRegSchema = new mongoose.Schema({
//     customerCode: {
//         type: String,

//         unique: true
//     },
//     name: {
//         type: String,

//     },
//     guardianName: {
//         type: String,
//     },
//     booking: {
//         type: Date,

//     },
//     dateRequirement: {
//         type: Date,

//     },
//     requirementpurpose: {
//         type: String
//     },
//     securityAmount: {
//         type: String
//     },
//     closingDate: {
//         type: Date,

//     },
//     securityAdjustment: {
//         type: String
//     },
//     presentAddress: {
//         type: String
//     },
//     vill: {
//         type: String
//     },
//     street: {
//         type: String
//     },
//     landmark: {
//         type: String
//     },
//     post: {
//         type: String
//     },
//     district: {
//         type: String
//     },
//     state: {
//         type: String
//     },
//     pin: {
//         type: String
//     },
//     permanentAddress: {
//         type: String
//     },
//     permanentVill: {
//         type: String
//     },
//     permanentStreet: {
//         type: String
//     },
//     permanentLandmark: {
//         type: String
//     },
//     permanentPost: {
//         type: String
//     },
//     permanentDistrict: {
//         type: String
//     },
//     permanentState: {
//         type: String
//     },
//     permanentPin: {
//         type: String
//     },
//     dateOfBirth: {
//         type: Date,
//     },
//     gender: {
//         type: String,
//         // enum: ['Male', 'Female'],
//         default: ''
//     },
//     attendService: {
//         type: String,
//     },
//     forService: {
//         type: String,
//     },
//     age: {
//         type: Number
//     },
//     nationality: {
//         type: String
//     },
//     contactNumber: {
//         type: String
//     },
//     alternativeNumber: {
//         type: String
//     },
//     religion: {
//         type: String
//     },
//     marriageStatus: {
//         type: String,
//         // enum: ['Single', 'Married', 'Widow'],
//         default: ''
//     },
//     idCardType: {
//         type: String,
//         // enum: ['aadhar-card', 'voter-idcard', 'pan-card', 'driving-license'],
//         default: ''
//     },
//     idCardNumber: {
//         type: String
//     },
//     idProofImage: {
//         type: String,
//     },
//     statusofCustomer: {
//         type: String
//     },
//     customerRemark: {
//         type: String
//     },
//     customerSpeak: {
//         type: String,
//         default: ""
//     },
//     assign: {
//         type: String,
//         default: "Not Assign"
//     },
//     balance: {
//         type: String,
//         default: 0
//     },
//     status: {
//         type: String,
//         default: "Active User"
//     },

//     customerbill: {
//         type: String,
//         default: 0
//     },
//     amount_received: {
//         type: String,
//         default: 0
//     },
//     file: {
//         type: String
//     },
//     customerbill: {
//         type: String,
//         default: 0
//     }

// }, { timestamps: true })



const customerRegSchema = new mongoose.Schema({
    customerCode: {
        type: String,

        unique: true
    },
    name: {
        type: String,

    },
    guardianName: {
        type: String,
    },
    booking: {
        type: Date,

    },
    dateRequirement: {
        type: Date,

    },
    requirementpurpose: {
        type: String
    },
    securityAmount: {
        type: String,
        default: 0
    },
    closingDate: {
        type: Date,

    },
    securityAdjustment: {
        type: String
    },
    presentAddress: {
        type: String
    },
    vill: {
        type: String
    },
    street: {
        type: String
    },
    landmark: {
        type: String
    },
    post: {
        type: String
    },
    district: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    permanentVill: {
        type: String
    },
    permanentStreet: {
        type: String
    },
    permanentLandmark: {
        type: String
    },
    permanentPost: {
        type: String
    },
    permanentDistrict: {
        type: String
    },
    permanentState: {
        type: String
    },
    permanentPin: {
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        // enum: ['Male', 'Female'],
        default: ''
    },
    generatedInvoice : [{
        generatedCustomerId:{
            type : String,
        },
        generatedTime:{
            type : String
        },
        generatedBill:{
            type : String
        },
        generatedToDate:{
            type : String,
        },
        generatedFromDate:{
            type : String,
        },
        generatedRate:{
            type : String,
        },
        generatedAyaAssigned:{
            type : String,
        },
        generatedAyaPurpose:{
            type : String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // type : String,
    }],
    attendService: {
        type: String,
    },
    forService: {
        type: String,
    },
    age: {
        type: Number
    },
    nationality: {
        type: String
    },
    contactNumber: {
        type: String
    },
    alternativeNumber: {
        type: String
    },
    religion: {
        type: String
    },
    marriageStatus: {
        type: String,
        // enum: ['Single', 'Married', 'Widow'],
        default: ''
    },
    idCardType: {
        type: String,
        // enum: ['aadhar-card', 'voter-idcard', 'pan-card', 'driving-license'],
        default: ''
    },
    idCardNumber: {
        type: String
    },
    idProofImage: {
        type: String,
    },
    statusofCustomer: {
        type: String
    },
    customerRemark: {
        type: String
    },
    customerSpeak: {
        type: String,
        default: ""
    },
    assign: {
        type: String,
        default: "Not Assign"
    },
    assignedAyaDetails:[{
        assignedAyaCode : {
            type : String,
        },
        assignedAyaName : {
            type : String
        },
        assignedAyaFromDate : {
            type : String,
        },
        assignedAyaToDate : {
            type : String,
        },
        assignedAyaReason : {
            type : String
        },
        assignedAyaRate : {
            type : String
        },
        assignedAyaPurpose : {
            type : String
        },
        assignedAyaShift : {
            type : String
        },
        assignedAyaRate : {
            type : String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        
    }],
    file: {
        type: String
    },
    totalCustomerBill: {
        type: String,
        default: 0
    },
    totalRecievedmoney: {
        type: String,
        default: 0
    },
    customerpayment: [
        {
            customerbill: {
                type: String,
                default: 0
            },
            amount_received: {
                type: String,
                default: 0
            },
            FromDate : {
                type : String,
            },
            ToDate : {
                type : String,
            },
            Rate : {
                type : String
            },
            Purpose : {
                type : String
            },
            Shift : {
                type : String
            },
            paymentstatus: {
                type: String,
                default: "Not Pending"
            },
            balance: {
                type: String,
                default: 0
            },
            // securityMoney: {
            //     type: String
            // },
        },
        
    ]

}, { timestamps: true })



// customerRegSchema.pre('save', async function (next) {
//     this.generatedInvoice.sort((a, b) => b.createdAt - a.createdAt);
//     this.assignedAyaDetails.sort((a, b) => a.createdAt - b.createdAt);

//     if (!this.customerCode) {
//         try {
//             // Get the last customer code from the database
//             const lastCustomer = await mongoose.model('Customer', customerRegSchema)
//                 .findOne({}, { customerCode: 1 }, { sort: { createdAt: -1 } })
//                 .lean()
//                 .exec();

//             let nextCustomerCode;
//             if (lastCustomer && lastCustomer.customerCode) {
//                 const lastCodeNumber = parseInt(lastCustomer.customerCode.slice(-3));
//                 nextCustomerCode = (lastCodeNumber + 1).toString().padStart(3, '0');
//             } else {
//                 nextCustomerCode = '001';
//             }

//             this.customerCode = `1${nextCustomerCode}`;
//         } catch (error) {
//             console.error('Error generating customer code:', error);
//         }
//     }
//     next();
// });

customerRegSchema.pre('save', function(next) {
    this.assignedAyaDetails.sort((a, b) => b.createdAt - a.createdAt);
    next();
  });
  


customerRegSchema.pre('save', async function (next) {
    this.generatedInvoice.sort((a, b) => b.createdAt - a.createdAt);
    
    // Sort assignedAyaDetails array in descending order based on createdAt
    this.assignedAyaDetails.sort((a, b) => b.createdAt - a.createdAt);
  
    if (!this.customerCode) {
      try {
        // Get the last customer code from the database
        const lastCustomer = await mongoose.model('Customer', customerRegSchema)
          .findOne({}, { customerCode: 1 }, { sort: { createdAt: -1 } })
          .lean()
          .exec();
  
        let nextCustomerCode;
        if (lastCustomer && lastCustomer.customerCode) {
          const lastCodeNumber = parseInt(lastCustomer.customerCode.slice(-3));
          nextCustomerCode = (lastCodeNumber + 1).toString().padStart(3, '0');
        } else {
          nextCustomerCode = '001';
        }
  
        this.customerCode = `1${nextCustomerCode}`;
      } catch (error) {
        console.error('Error generating customer code:', error);
      }
    }
    next();
  });
  


module.exports = mongoose.model('Customer', customerRegSchema)
