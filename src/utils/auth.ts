import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sheikmo2425v@gmail.com',
        pass: 'klkm xyql exri bxse'
    }
});

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: 'sheikmo2425v@gmail.com',
        to: email,
        subject: 'Your OTP for Authentication',
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
};
