const nodemailer = require("nodemailer")
const sendMail = (options) =>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:"gmail",
        port:587,
        secure:false,
        auth:{
            user:"pratap.bairagi.test@gmail.com",
            pass:"Pratap-18May1994"
        }
    })

    const mailOption ={
        to:options.email,
        from:"pratap.bairagi.test@gmail.com",
        subject:options.subject,
        text:options.message
    }

  return  transporter.sendMail(mailOption)
}

module.exports = sendMail