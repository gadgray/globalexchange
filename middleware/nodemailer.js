const nodemailer = require('nodemailer');



module.exports = { registerMail : (reciversMail, firstName)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Hi ${firstName},<br> Welcome to the Vibrant Marketplace.  Your account has been successfully set up. <br>What happens next? <br> Do you want to take better advantage of the Vibrant Market? <a href= 'localhost:3000/login'>Click the link to get started</a> </p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'mailsubject',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
        depositReqMail : (reciversMail, amount, firstName)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Congratulations ${firstName}, <br>Your deposit request for $${amount} has been received and will added to your trading account in a few minutes. <br> Please contact admin@mercadovibrante.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team <br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Deposit Request',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },

        depositMail : (reciversMail, amount, firstName)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Congratulations ${firstName}, <br>A deposit of $${amount} has been received and added to your trading account.<br> Your trading will start immediately. <br> Please contact globalexchangetrading1@gmail.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team <br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Deposit Comfirmation',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
        depositFailureMail : (reciversMail, amount, firstName)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Sorry ${firstName}, <br>you deposit request $${amount} has been failed.<br> Please contact globalexchangetrading1@gmail.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team <br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Deposit Comfirmation',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
        withdrawalReqMail : (reciversMail, amount, firstName, address)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Congratulations ${firstName}, <br>Your withdrawal request of $ ${amount} has been recieved and is being sent to your wallet address ${address}<br> Please contact globalexchangetrading1@gmail.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team<br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Withdrawal Request',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
        withdrawalMail : (reciversMail, amount, firstName, address)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Congratulations ${firstName}, <br>Your withdrawal request of $ ${amount} has been approved and is being sent to your wallet address ${address}<br> Please contact globalexchangetrading1@gmail.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team<br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Withdrawal Comfirmation',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
        rejectWithdrawalMail : (reciversMail, amount, firstName)=>{
            const transport = nodemailer.createTransport({
        
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const body = `<p>Sorry ${firstName}, <br>Your withdrawal request of $ ${amount} has been rejected. Please contact globalexchangetrading1@gmail.com, live chat or your account manager/reference (if any) for more details.<br>Good luck<br>Yours sincerely,<br>Account Team<br>Vibrant Market <br> DO NOT REPLY TO THIS EMAIL</p>`
            
            const mailOpt = {
                from: process.env.EMAIL_ADDRESS,
                to: reciversMail,
                subject: 'Withdrawal Request Rejected',
                text: 'emails body',
                html: body,
            }
            
            transport.sendMail(mailOpt, (err,status)=>{
                if(err){
                    console.log(err);
            
                }else{
                    console.log(`message sent ${status.response}`)
                }
            
            });
        },
    


} 