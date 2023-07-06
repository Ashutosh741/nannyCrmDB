// const express = require('express')
// const dotenv = require('dotenv');
// const cors = require('cors')
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose')
// const triquity = require("./controllers/Triquity");
// const fs = require("fs");
// const bodyParser = require("body-parser");
// const PDFDocument = require("pdfkit");
// const pdf = require("html-pdf");
// const multer = require('multer')

// const ayaReg = require('./routes/Route')




// dotenv.config()

// const app = express()
// app.use(bodyParser.json());

// const port = process.env.port || 8109


// // for testing
// app.get('/', (req, res) => {
//     res.send("api is working")
// })



// mongoose.set('strictQuery', false)
// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('MongoDB database connected');
//     } catch (err) {
//         console.log('MongoDB database connection failed');
//     }
// }




// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());



// // triquity

// app.post("/save-pdf", (req, res) => {
//     const { result } = req.body;

//     // Generate a random file name for the PDF
//     const fileName = `generated-pdf-${Date.now()}.pdf`;

//     // HTML content to convert to PDF
//     const htmlContent = `
//       <html>
//         <body>
//           <div>${result}</div>
//         </body>
//       </html>
//     `;

//     // PDF options
//     const pdfOptions = { format: "Letter" };

//     // Generate the PDF file
//     pdf.create(htmlContent, pdfOptions).toFile(fileName, (error) => {
//         if (error) {
//             console.error("Error generating PDF:", error);
//             res.status(500).send("Error generating PDF");
//         } else {
//             console.log("PDF generated successfully!");
//             res.sendFile(fileName, { root: __dirname });
//         }
//     });
// });

// // triqutiy end


// app.use(ayaReg)


// // app.use(customerReg)









// app.listen(port, () => {
//     connect();
//     console.log('server listing on port', port);
// })







// Update the route for creating an Aya registration entry to include the upload middleware. This will handle the image upload:

// POST /ayareg - Create a new AyaReg entry
router.post('/ayareg', upload.single('image'), createAyaRegEntry);



// Modify the createAyaRegEntry controller function to handle the uploaded image and generate an image URL. Here's an example of how you can modify the function:

const createAyaRegEntry = (req, res) => {
    // Access the uploaded image file
    const imageFile = req.file;

    // Generate the image URL
    const imageUrl = `${req.protocol}://${req.get('host')}/${imageFile.path}`;

    // Rest of the code to create the Aya registration entry and save the image URL

    // Return a response with the generated image URL
    res.json({ imageUrl });
};



//   By implementing these changes, you can handle image uploads during Aya registration, store the uploaded images in the uploads folder, and generate an image URL to be associated with the Aya registration entry.






















