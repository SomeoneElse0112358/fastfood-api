const nodemailer = require('nodemailer');
const { emailOfSendler, passwordOfSendler } = require('../config');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: emailOfSendler,
    pass: passwordOfSendler
  }
});

module.exports = (from, to, email) =>
  transporter.sendMail({
    from,
    to,
    subject: email.subject,
    text: email.text
  });
