const nodemailer = require('nodemailer')
const MailTransporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"amanbharti822002@gmail.com",
        pass:"zniaqanklnmddony"
    }
})

async function SentMail(to,subject,text,html){
    const info   = await MailTransporter({
        from:"kushbhardwaj8800@gmail.com",
        to:to,
        subject:subject,
        text:text,
        html:html
    })
    console.log("Otp sent in your mail")
}
module.exports = SentMail;