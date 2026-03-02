const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { smtpSender } = require("./utils/smtpSender");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/data", (req, res) => {
  const data = {
    message: "This is some data from the server",
    timestamp: new Date(),
  };
  res.json(data);
});

app.get("/api/sendMail", async (req, res) => {
  let recipients = [
    {
      email: "asmaulsarder@yahoo.com",
    },
    {
      email: "asmaulsarder@outlook.com",
    },
    // {
    //   email: "mdasmaulsarder123@gmail.com",
    // },
    // {
    //   email: "asmaul123sarder@gmail.com",
    // },
  ];
  const subject = "Test Email";
  const html = "<h1>Hello from Bulk Mailer</h1><p>This is a test email.</p>";
  const text = "Hello from Bulk Mailer. This is a test email.";

  for (let i = 0; i < recipients.length; i++) {
    try {
      await smtpSender(recipients[i].email, subject, html, text, []);

      console.log(`Email sent to ${recipients[i].email}`);
    } catch (err) {
      console.error(`Failed to send email to ${recipients[i].email}:`, err);
    }

    await randomDelay(3000, 7000);
  }

  res.json({ message: "Emails are being sent" });
});

function randomDelay(min, max) {
  const time = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
