
// Publisher function
export const publishToQueue = async (channel, queueName, data) => {
    channel.assertQueue(queueName);  // asserting queue
    channel.sendToQueue(queueName, Buffer.from(data));  // sending queue name and payload to queue.
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};
