const nodemailer = require('nodemailer');
const emailConfig = require('./emailConfig');

function EmailSender(data){
    const transporter = nodemailer.createTransport({
        service: emailConfig.service,
        auth: {
          user: emailConfig.userEmail,
          pass: emailConfig.password
        }
      });

      const mailOptions = {
        from: emailConfig.emailFrom,
        to: emailConfig.emailTo,
        subject: emailConfig.subject,
        text: JSON.stringify(data)
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports=EmailSender