import express from "express";
import { sendEmail } from "./sendMail.js";
const app = express();
const PORT = process.env.MAIL_SERVICE_PORT || 5002;

import amqp from "amqplib"
import rabbitmq from './message-broker/rabbitmq.js';
app.use(express.json());
app.use(express.urlencoded({extended: true}));

function handleMessage(messageContent) {
    console.log("MAIL", messageContent)

    console.log('Processing message:', messageContent);
    let from;
    if(!messageContent.operation.user){
        from = `"webadvance" <null>`;
    }
    else{
        // from = messageContent.operation.user.email.toString();
        const email = messageContent.operation.user.email.toString();
        from = `"webadvance" <${email}>`;
    } 
    const to = messageContent.email.toString();
   

    const subject = `Report Processing - ID ${messageContent._id.toString()}`;
    let address;
    if(messageContent.type === "location" && messageContent.location?.address){
        address = messageContent.location.address;
    }
    else if(messageContent.type === "board" && messageContent.board.location.address){
        address = messageContent.board.location.address;
    }
    else address = "null"
    const fullName = messageContent.operation.user.fullname.toString();
    const content = messageContent.operation.content.toString();
    const text = `Phản hồi về báo cáo: ${messageContent._id.toString()}
Hình thức: ${messageContent.report_form.label}
Địa chỉ điểm đặt/biển quảng cáo: ${address !== undefined ? address : 'N/A'}
Nội dung: ${messageContent.report_content}
Người xử lý: ${fullName}
Cách thức xử lý: ${content}`;
    sendEmail(from, to, subject, text)
  }

function handle(messageContent) {
    console.log('Processing message:', messageContent);
    let from;
        // from = messageContent.operation.user.email.toString();
    from = `"webadvance" <${null}>`;
    //const to = messageContent.email.toString();
    const to = messageContent.email;

    const subject = `Forgot Password - OTP for Account Recovery`;

    const text = `We received a request to reset the password for your account. Please use the following OTP to verify your identity and set a new password:
OTP Code: ${messageContent.otp}

Note: This OTP is valid for a single use and will expire in 60 seconds.

Thank you for using our service.
Best regards,
[webadvance]`;
    sendEmail(from, to, subject, text)
  }

rabbitmq.consumeMessage('MAIL', handleMessage);
rabbitmq.consumeMessage('OTP', handle);
app.listen(PORT, () => {
    console.log(`Mail-Service at ${PORT}`);
})