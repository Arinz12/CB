require("dotenv").config()
function sendEmailAdmin(message,emaill){
  const nodemailer = require('nodemailer');
  
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server hostname
    port: 465, // Replace with the appropriate port number
    auth: {
      type:'Login' ,
      user: 'arizegift1432@gmail.com', // Replace with your email address
      pass: process.env.PASSM
       // Replace with your email password or app-specific password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  let mailOptions ;
  // Define email options
     mailOptions = {
      from: '"D & G SIGNATURE" arizegift1432@gmail.com', // Sender address
      to: emaill, // List of recipients
      subject: "Fanbiq Update", // Subject line
      html: message, // Plain text body
    };
  
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
      return;
    }
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  });
  }

  module.exports= sendEmailAdmin