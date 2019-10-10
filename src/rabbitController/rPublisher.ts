export const publishToQueue = async (channel, queueName, data) => {
    console.log(queueName, data);
    channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};
