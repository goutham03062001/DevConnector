const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: 'gouthamkumarpolapally@gmail.com',
  pass: '#Goutham@422'
 }
});

let mailDetails = {
 from: mailTransporter.auth.user,
 to: 'goutham.190422@gmail.com',
 subject: 'Test mail',
 text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
 if(err) {
  console.log('Error Occurs');
 } else {
  console.log('Email sent successfully');
 }
});
