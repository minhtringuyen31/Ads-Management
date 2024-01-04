import express from "express";
import { sendEmail } from "./sendMail.js";
const app = express();
const PORT = process.env.MAIL_SERVICE_PORT || 5002;

import amqp from "amqplib"
import rabbitmq from './message-broker/rabbitmq.js';
app.use(express.json());
app.use(express.urlencoded({extended: true}));

function handleMessage(messageContent) {
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
    //const to = messageContent.email.toString();
    const to = 'buiquangthanh1709@gmail.com'

    const subject = `Report Processing - ID ${messageContent._id.toString()}`;
    let address;
    if(messageContent.type === "location"){
        address = messageContent.location.address;
    }
    else{
        address = messageContent.board.location.address;
    }
    const fullName = messageContent.operation.user.fullname.toString();
    const content = messageContent.operation.content.toString();
    const text = `Phản hồi về báo cáo: ${messageContent._id.toString()}
Hình thức: ${messageContent.report_form}
Địa chỉ điểm đặt/biển quảng cáo: ${address !== undefined ? address : 'N/A'}
Nội dung: ${messageContent.report_content}
Người xử lý: ${fullName}
Cách thức xử lý: ${content}`;
    sendEmail(from, to, subject, text)
  }

rabbitmq.consumeMessage('MAIL', handleMessage);
app.listen(PORT, () => {
    console.log(`Mail-Service at ${PORT}`);
})