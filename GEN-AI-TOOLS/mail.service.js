
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendEmail({to,subject,html,text=""}){
    const mailopts={
        from:process.env.EMAIL_USER,
        to,
        subject,
        html,
        text
    }

    const dts  = await transporter.sendMail(mailopts)
    console.log("sent mail",dts);


    return "Email sent sucessfully"+to;
    
}

