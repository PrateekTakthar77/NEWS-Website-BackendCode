const { createTransport } = require("nodemailer");
const sendEmail = async (to, subject, text) => {
    const transpoter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    await transpoter.sendMail({
        to,
        subject,
        text,
        from: "jewelleryBliss@gmail.com"
    });

}

module.exports = sendEmail;