const nodemailer = require("nodemailer");
require('dotenv').config();  // This loads the .env file into process.env



const mailSender = async (email1, title, body) => {
  try {
    // Create a transport object using the transport service and credentials
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,  // e.g., smtp.gmail.com for Gmail
      port: 587,                   // Port 587 is for TLS, change it based on your SMTP service
      secure: false,                // Set to false for TLS (if using SSL, set to true and use port 465)
      auth: {
        user: process.env.MAIL_USER, // Sender's email from the environment variable
        pass: process.env.MAIL_PASS, // Sender's password from the environment variable
      },
      tls: {
        rejectUnauthorized: false,  // Disable certificate validation (helps with self-signed certificates)
      },
    });

    // Send the email
    let info = await transporter.sendMail({
      from: `"LearnAura " <${process.env.MAIL_USER}>`,  // Sender address
      to: `${email1}`,                                                // Receiver address
      subject: `${title}`,                                           // Subject line
      html: `${body}`,                                               // HTML body
    });

    console.log(info.response);  // Log the response
    return info;  // Return the info for further use
  } catch (error) {
    console.log(error.message);  // Log any error that occurs
    return error.message;        // Return the error message
  }
};

module.exports = mailSender

// const nodemailer = require("nodemailer");
// const readline = require('readline');

// // Create an interface to take user input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',  // Use Gmail's SMTP host
//       port: 587,               // Port 587 for TLS
//       secure: false,           // Set to false for TLS
//       auth: {
//         user: 'rushikeshbagal8444@gmail.com',   // Your Gmail address from the .env file
//         pass: 'lrys udne qzzu bvzx',   // Your Gmail password or App Password from the .env file
//       },
//       tls: {
//         rejectUnauthorized: false,  // Disable certificate validation (useful for some certificates)
//       },
//     });

//     let info = await transporter.sendMail({
//       from: `"LearnAura | CodeHelp" <${process.env.MAIL_USER}>`,
//       to: email, // Recipient email
//       subject: title, // Subject line
//       html: body, // Email body
//     });

//     console.log(info.response);
//     return info;
//   } catch (error) {
//     console.log(error.message);
//     return error.message;
//   }
// };

// // Prompt for recipient email and email content
// const promptUserForInput = () => {
//   rl.question('Enter the recipient email address: ', async (recipientEmail) => {
//     rl.question('Enter the email subject: ', (subject) => {
//       rl.question('Enter the email body: ', async (body) => {
//         try {
//           const result = await mailSender(recipientEmail, subject, body);
//           console.log('Email sent:', result);
//         } catch (error) {
//           console.log('Error sending email:', error);
//         } finally {
//           rl.close(); // Close the input interface
//         }
//       });
//     });
//   });
// };

// // Call the function to start prompting user for email details
// promptUserForInput();
