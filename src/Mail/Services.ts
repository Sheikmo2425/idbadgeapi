import nodemailer from 'nodemailer';
import util from 'util';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
const readFileAsync = util.promisify(fs.readFile);
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  service:'gmail',
  auth: {
    user: 'sheikmo2425v@gmail.com',
    pass: 'zlot ttwq csto ykt'
  }
});

// Function to send email
const sender = async (to:string, subject:string, text:string,cc:string,bcc:string,templateName:string,data:any) => {
  const template = await readFileAsync(path?.join(__dirname, `./Templates/${templateName}.ejs`));
	const html = ejs?.render(template.toString(), Object.assign(data || {}));
  try {
    
    let info = await transporter.sendMail({
      from: 'sheikmo2425v@gmail.com', 
      to: to, 
      subject: subject, 
      cc: cc, 
      bcc: bcc,
      text: text, 
      html:html
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return info.messageId;
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw error;
  }
};

export default sender;
