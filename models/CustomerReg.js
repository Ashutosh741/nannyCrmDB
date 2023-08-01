const mongoose = require('mongoose')

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
    baseRate :{
        type : Number,
    },
    booking: {
        type: String,

    },
    dateRequirement: {
        type: String,

    },
    requirementpurpose: {
        type: String
    },
    securityAmount: {
        type: String,
        default: 0
    },
    closingDate: {
        type: String,

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
    customerGeneratedInvoice : [{
        generatedCustomerId:{
            type : String,
        },
        generatedDate : {
            type : String,
        },
        generatedTime:{
            type : String
        },
        generatedPaymentMode : {
            type : String
        },
        generatedTransactionId:{
            type : String,
        },
        generatedUpi : {
            type : String,
        },
        generatedTransactionDate:{
            type : String,
        },
        generatedBill:{
            type : Number
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
        generatedAmountReceived:{
            type : String,
        },
        generatedWorkingDays:{
            type : String,
        },
        generatedLeaveTaken:{
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
    casteCategory:{
        type : String
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
    // idProofImage: {
    //     type: String,
    // },
    idCardImage:{
        type : String,
        default : ""
    },
    // aadharCardNumber:{
    //     type : String
    // },
    // aadharCardImage:{
    //     type : String,
    //     default : ""
    // },
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
        type: Boolean,
    },
    assignedAyaDetails:[{
        assignedAyaCode : {
            type : String,
            default: ''

        },
        assignedAyaName : {
            type : String,
            default: ''


        },
        assignedAyaFromDate : {
            type : String,
        },
        assignedAyaToDate : {
            type : String,
        },
        assignedAyaReason : {
            type : String,
            default: ''

        },
        assignedAyaRate : {
            type : String,
            default: ''

        },
        assignedAyaPurpose : {
            type : String,
            default: ''

        },
        assignedAyaShift : {
            type : String,
            default: ''

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
    totalPendingAmount: {
        type: Number,
        default: 0
    },
    customerPaymentDetails: [
        {
        paymentBill:{
            type : Number
        },
        paymentAmountReceived:{
            type : Number,
            default : 0
        },
        paymentPendingAmount:{
            type : Number,
        },
        paymentFromDate:{
            type : String,
        },
        paymentToDate:{
            type : String,
        },

        paymentRate:{
            type : String,
        },
        paymentAyaAssigned:{
            type : String,
        },
        paymentAyaPurpose:{
            type : String,
        },
        paymentWorkingDays:{
            type : String,
        },
        paymentLeaveTaken:{
            type : String,
        },
        paymentstatus: {
            type: String,
            default: "Not Pending"
        },
        paymentalance: {
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
    // this.generatedInvoice.sort((a, b) => b.createdAt - a.createdAt);
    
    // Sort assignedAyaDetails array in descending order based on createdAt
    // this.assignedAyaDetails.sort((a, b) => b.createdAt - a.createdAt);
  
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
  
        this.customerCode = `C1${nextCustomerCode}`;
      } catch (error) {
        console.error('Error generating customer code:', error);
      }
    }
    next();
  });
  


module.exports = mongoose.model('Customer', customerRegSchema)
