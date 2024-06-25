// services/mailService.js
const nodemailer = require("nodemailer");

const SENDERSMAIL = "noreply@deleever.one";
const transporter = nodemailer.createTransport({
  host: "mail.deleever.one",
  port: 465,
  secure: true,
  auth: {
    user: SENDERSMAIL,
    pass: "Prth@2024",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = (email, sellerName, otp) => {
  const mailOptions = {
    from: SENDERSMAIL,
    to: email,
    subject: "OTP for password reset",
    html: ` <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP</title>
    
    <style>
     
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        img {
            display: block;
            margin: 0 auto;
            width: 100px; /* Adjust the width as needed */
            height: 100px; /* Adjust the height as needed */
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear ${sellerName},</p>
        <p>Your OTP is ${otp}.The OTP will be expired in 15 minutes.</p>
        <p>Best regards,</p>
        <p>The Deleever Team</p>
    </div>
</body>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("this is error" + error);
    } else {
      console.log("email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
