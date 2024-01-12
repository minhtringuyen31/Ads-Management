import amqp from "amqplib";

async function consumeMessage(queue, callback) {
  try {
    const connection = await amqp.connect(
      `amqps://uoptfspu:Byy4uZRFCzebieZXKc0IjEor5wdUfRda@armadillo.rmq.cloudamqp.com/uoptfspu`
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(queue, (message) => {
      if (message !== null) {
        const content = JSON.parse(message.content.toString());
        callback(content);
        channel.ack(message);
      }
    });

    console.log(`Waiting for messages on queue: ${queue}`);
  } catch (error) {
    console.error(`Error consuming messages: ${error}`);
  }
}

export default consumeMessage;
