import nodemailer from 'nodemailer';

const t = nodemailer.createTransport({ 
  host: 'smtp.gmail.com', 
  port: 465, 
  secure: true, 
  auth: { 
    user: 'velanarayaneeyam@gmail.com', 
    pass: 'taff lsmf lenb vgew' 
  } 
}); 

t.sendMail({
  from: '"Vela Travels" <velanarayaneeyam@gmail.com>', 
  to: 'velanarayaneeyam@gmail.com', 
  subject: 'TEST EMAIL FROM YOUR APP', 
  text: 'If you see this, the email credentials work!'
}).then(() => console.log('Sent!')).catch(console.error);
