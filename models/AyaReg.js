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
            type : String
        },
        assignedCustomerName:{
            type : String,
        },
        assignedCustomerFromDate :{
            type : String,
        },
        assignedCustomerToDate: {
            type  :String,
        },
        assignedCustomerReason: {
            type  : String,
        },
        assignedCustomerRate:{
            type : String,
        },
        assignedCustomerShift:{ 
            type : String,
        },
        assignedCustomerPurpose:{
            type : String,
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
    ayapayment: [
        {
            ayaBill: {
                type: String,
                default: 0
            },
            ayapaid: {
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
        }
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



ayaSchema.pre('save', function (next) {
    if (!this.ayaCode) {
        // const fullName = this.name.toLowerCase();
        const randomNumbers = Math.floor(Math.random() * 900) + 100;

        // this.ayaCode = `${fullName}${randomNumbers}`;
        this.ayaCode = `${randomNumbers}`;

    }
    next();
});




module.exports = mongoose.model("Aya", ayaSchema);













