const nodemailer = require('nodemailer');


const sendMail = (reciversMail)=>{
    const transport = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: precess.env.EMAIL_ADDRESS,
            pass: precess.env.EMAIL_PASSWORD,
        }
    });
    
    const mailOpt = {
        from: precess.env.EMAIL_ADDRESS,
        to: reciversMail,
        subject: 'mailsubject',
        text: 'emails body'
    }
    
    transport.sendMail(mailOpt, (err,status)=>{
        if(err){
            console.log(err);
    
        }else{
            console.log(`message sent ${status.response}`)
        }
    
    });
}

module.exports = sendMail;