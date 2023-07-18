const mongoose = require('mongoose');


const ayaSchema = new mongoose.Schema({
    ayaCode: {
        type: String,

        unique: true
    },
    name: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    rate :{
        type : Number,
    },
    workShift: {
        type: String,
        // enum: ['Day', 'Night', 'day-night'],
        default: ''
    },
    joining: {
        type: Date
    },
    closingDate: {
        type: Date
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
        type: Date
    },
    gender: {
        type: String,
        // enum: ['Male', 'Female'],
        default: ''
    },
    ayaGeneratedInvoice : [{
        generatedAyaId:{
            type : String,
            default: ''
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
        generatedCustomerAssigned:{
            type : String,
            default: ''
            
        },
        generatedCustomerPurpose:{
            type : String,
            default: ''

        },
        generatedAmountPaid:{
            type : String,
            default: ''

        },
        generatedWorkingDays:{
            type : String,
            default: ''

        },
        generatedLeaveTaken:{
            type : String,
            default: ''

        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // type : String,
    }],
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
    statusAya: {
        type: String,
        // enum: ['Running-Aya', 'Close-Aya', 'Hold-Aya'],
        default: ''
    },
    ayaRemark: {
        type: String
    },
    ayaSpeciality: {
        type: String
    },
    workinglocation: {
        type: String,
    },
    ayaCanSpeak: {
        type: String,
        // enum: ['Hindi', 'Bengali', 'English'],
        default: ''
    },
    assign: {
        type: String,
        default: "Not Assign"
    },
    assignedCustomerDetails:[{
        assignedCustomerCode :{
            type : String,
            default: ''

        },
        assignedCustomerName:{
            type : String,
            default: ''

        },
        assignedCustomerFromDate :{
            type : String,
            default: ''

        },
        assignedCustomerToDate: {
            type  :String,
            default: ''

        },
        assignedCustomerReason: {
            type  : String,
            default: ''

        },
        assignedCustomerRate:{
            type : String,
            default: ''

        },
        assignedCustomerShift:{ 
            type : String,
            default: ''

        },
        assignedCustomerPurpose:{
            type : String,
            default: ''

        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    file: {
        type: String,
        default: ""
    },
    totalAyapaid: {
        type: String,
        default: 0
    },
    totalCustomerbill: {
        type: String,
        default: 0
    },
    totalProfit: {
        type: String,
        default: 0
    },
    pendingAmount: {
        type: Number,
        default: 0
    },
    ayaPaymentDetails: [
        {
        paymentBill:{
            type : Number
        },
        paymentAmountReceived:{
            type : Number,
        },
        paymentPendingAmount:{
            type : String,
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
        paymentCustomerAssigned:{
            type : String,
        },
        paymentCustomerPurpose:{
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
        paymentBalance: {
            type: String,
            default: 0
        },
        // securityMoney: {
        //     type: String
        // },
        },
        
    ]



}, { timestamps: true });


// ayaSchema.pre('save', function (next) {
//     if (!this.ayaCode) {
//         const name = this.name.toLowerCase();
//         const nameInitials = name
//             .split(' ')
//             .map((word) => word.charAt(0))
//             .join('');

//         const randomNumbers = Math.floor(Math.random() * 9000) + 1000;

//         this.ayaCode = `${nameInitials}${randomNumbers}`;
//     }
//     next();
// });



// ayaSchema.pre('save', function (next) {
//     if (!this.ayaCode) {
//         // const fullName = this.name.toLowerCase();
//         const randomNumbers = Math.floor(Math.random() * 900) + 100;

//         // this.ayaCode = `${fullName}${randomNumbers}`;
//         this.ayaCode = `${randomNumbers}`;

//     }
//     next();
// });

ayaSchema.pre('save', async function (next) {
    // this.generatedInvoice.sort((a, b) => b.createdAt - a.createdAt);
    
    // Sort assignedAyaDetails array in descending order based on createdAt
    // this.assignedAyaDetails.sort((a, b) => b.createdAt - a.createdAt);
  
    if (!this.ayaCode) {
      try {
        // Get the last customer code from the database
        const lastAya = await mongoose.model('Aya', ayaSchema)
          .findOne({}, { ayaCode: 1 }, { sort: { createdAt: -1 } })
          .lean()
          .exec();
  
        let nextAyaCode;
        if (lastAya && lastAya.ayaCode) {
          const lastCodeNumber = parseInt(lastAya.ayaCode.slice(-3));
          nextAyaCode = (lastCodeNumber + 1).toString().padStart(3, '0');
        } else {
          nextAyaCode = '001';
        }
  
        this.ayaCode = `A1${nextAyaCode}`;
      } catch (error) {
        console.error('Error generating Aya code:', error);
      }
    }
    next();
  });
  


module.exports = mongoose.model("Aya", ayaSchema);













