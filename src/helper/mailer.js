const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.PASSWORD_EMAIL, // generated ethereal password
    },
});

const sendEmail = (toEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = await transporter.sendMail({
                from: process.env.USER_EMAIL, // sender address
                to: toEmail, // list of receivers
                subject: "[Tickitz] Please Confirm your email address ", // Subject line
                text: "Email Verification", // plain text body
                html: `<!DOCTYPE html>
                <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                  .container{
                    height: 200px;
                    height: 200px;
                    border: 5px;
                    margin-left: auto;
                    margin-right: auto;
                  }
                </style>
              </head>
              <body>
              <div class="containerfluid">
                <div class="container">
                  <h1>hey ${toEmail}</h1>
                  <p>Hey thankyou for joining. to finish registration, please click on this link below</p>
                  <a href="www.google.com">here</a>
                  <p>once verified, you can order you ticket on our website!</p>
                </div>
                </div>
              </body>
              </html>`
            });
            resolve(info)
        } catch (error) {
            reject(error)
        }

    })

}

module.exports = {
    sendEmail
}

