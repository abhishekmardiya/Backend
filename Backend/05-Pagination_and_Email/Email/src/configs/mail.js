const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "864b15173cbb57", // generated ethereal user
    pass: "9e9b89fc836ce5", // generated ethereal password
  },
});

module.exports = transporter;
