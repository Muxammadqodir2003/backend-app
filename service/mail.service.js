const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation acccount link ${activationLink}`,
      html: `
         <div>
           <a href="${activationLink}">Click to activate account</a>
         </div>
        `,
    });
  }

  async sendForgotPasswordMail(to, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Forgot password.`,
      html: `
         <div>
         <h1>Time to hacking. If you want to recovery your account just click the link below.</h1>
           <a href="${activationLink}">Link to recovery account</a>

           <b>This link will work 15 minutes</b>
         </div>
        `,
    });
  }
}

module.exports = new MailService();
