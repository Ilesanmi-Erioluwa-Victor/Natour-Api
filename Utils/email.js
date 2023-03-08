const nodemailer = require("nodemailer");

const sendEmail = options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    //if you want to use gmail,  Activate in gmail "less secure app" option
  });
  // 2) Define the email options
    const mailOptions = {
        from: "Ilesanmi Erioluwa <ilesanmierioluwavictor2gmail.com>",
        to : 
    }
  // 3) Actually send the email..
};
