const nodemailer = require("nodemailer");

async function smtpSender(to, subject, html, text, attachments) {
  const smtp = {
    host: "smtp.gmail.com",
    port: 587,
    user: "asmaul.dev72@gmail.com",
    pass: "rmkzbsltykbtyrjt",
  };
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    const info = await transporter.sendMail({
      from: smtp.user,
      to,
      subject,
      text,
      html,
      attachments,
    });
    console.log(info);

    return info;
  } catch (err) {
    throw err;
  }
}

module.exports = { smtpSender };
