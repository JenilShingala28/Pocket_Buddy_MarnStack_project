const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: to,
    subject: subject,
    html: text,
  };

  const mailresponse = await transporter.sendMail(mailOptions);
  console.log(mailresponse);
  return mailresponse;
};

module.exports = {
  sendingMail,
};
//sendingMail("samir.vithlani83955@gmail.com","Test Mail","this is test mail")
