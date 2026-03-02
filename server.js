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
    {
      email: "mdasmaulsarder123@gmail.com",
    },
    // {
    //   email: "asmaul123sarder@gmail.com",
    // },
  ];
  const subject = "Welcome to Our Platform";

  //   Hi [Name],

  // Thanks for joining our platform.
  // If you have any questions, feel free to reply.

  // Best regards,
  // Your Name
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Order Confirmation - Delta Trading Inc.</title>
</head>

<body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f4f7f9; color:#333;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:20px auto; border:1px solid #e1e4e8; background:#ffffff; border-radius: 8px; overflow: hidden;">

<tr>
<td style="padding:30px 20px; text-align:center; background-color:#0052cc;">
<h2 style="margin:0; font-size:24px; color:#ffffff;">Order Confirmation</h2>
<p style="margin:5px 0 0; font-size:14px; color:#d1e2ff;">Delta Trading Inc. | Transaction Receipt</p>
</td>
</tr>

<tr>
<td style="padding:30px 20px;">

<p style="font-size:16px;">Hello <strong>Asmaul Sarder</strong>,</p>

<p style="font-size:15px; line-height:1.6; color:#555;">
Thank you for choosing Delta Trading Inc. Your recent cryptocurrency purchase has been processed successfully. Below are the details of your transaction for your records.
</p>

<table width="100%" cellpadding="10" cellspacing="0" border="0" style="margin-top:20px; border:1px solid #eee; font-size:14px; border-collapse: collapse;">

<tr style="background:#f8f9fa; border-bottom: 2px solid #eee;">
<th align="left" style="color:#666;">Asset Description</th>
<th align="center" style="color:#666;">Quantity</th>
<th align="right" style="color:#666;">Unit Price (USD)</th>
<th align="right" style="color:#666;">Total</th>
</tr>

<tr style="border-bottom: 1px solid #eee;">
<td align="left" style="font-weight: bold;">Bitcoin (BTC)</td>
<td align="center">0.0075 BTC</td>
<td align="right">$101,332.00</td>
<td align="right">$759.99</td>
</tr>

<tr>
<td colspan="3" align="right" style="padding-top:15px; color:#777;">Subtotal:</td>
<td align="right" style="padding-top:15px; font-weight: bold;">$759.99</td>
</tr>

<tr>
<td colspan="3" align="right" style="font-size:16px; font-weight:bold; color:#000;">Grand Total:</td>
<td align="right" style="font-size:16px; font-weight:bold; color:#0052cc;">$759.99</td>
</tr>

</table>

<div style="margin-top:25px; padding:15px; background:#f9f9f9; border-radius:5px; font-size:14px;">
<strong>Invoice ID:</strong> #DT-342342<br>
<strong>Date of Issue:</strong> Oct 10, 2025<br>
<strong>Payment Status:</strong> <span style="color:#28a745; font-weight:bold;">Completed</span>
</div>

<p style="margin-top:25px; font-size:14px; color:#777; line-height:1.5;">
If you did not authorize this transaction or have any questions regarding this invoice, please visit our <a href="#" style="color:#0052cc; text-decoration:none;">Help Center</a> or contact our support team.
</p>

</td>
</tr>

<tr>
<td style="background:#f1f3f5; padding:20px; text-align:center; font-size:12px; color:#888;">
Delta Trading Inc. | 123 Business Ave, Suite 500, NY 10001<br>
This is an automated receipt. Please do not reply directly to this email.
<br><br>
<a href="#" style="color:#888; text-decoration:underline;">Unsubscribe from billing alerts</a>
</td>
</tr>

</table>

</body>
</html>`;
  const text =
    "Welcome to Our Platform\nThanks for joining our platform. If you have any questions, feel free to reply.\nBest regards,\nAsmaul";

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
