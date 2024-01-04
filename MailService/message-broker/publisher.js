// publisher.js
import amqp from "amqplib";

async function publishMessage(queue, message) {
  try {
    const connection = await amqp.connect(`amqps://uoptfspu:Byy4uZRFCzebieZXKc0IjEor5wdUfRda@armadillo.rmq.cloudamqp.com/uoptfspu`);
    const channel = await connection.createChannel();

    // Đảm bảo rằng queue tồn tại
    await channel.assertQueue(queue, { durable: false });

    // Gửi message đến queue
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`Message sent to queue "${queue}": ${JSON.stringify(message)}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(`Error publishing message to queue: ${error}`);
  }
}

export default publishMessage;
