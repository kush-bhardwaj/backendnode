const nodemailer = require('nodemailer')
const MailTransporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"kushbhardwaj8800@gmail.com",
        pass:"pysgnwbtxsmsyema"
    }
})

async function SentMail(to,subject,text,html){
    const info   = await MailTransporter.sendMail({
        from:"kushbhardwaj8800@gmail.com",
        to:to,
        subject:subject,
        text:text,
        html:html
    })
    console.log("Otp sent in your mail")
}
module.exports = SentMail;