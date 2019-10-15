
// Publisher function
export const publishToQueue = async (channel, queueName, data) => {
    channel.assertQueue(queueName, { durable: true, exclusive: false, autoDelete: true, arguments: { "x-expires": 1800000 } });  // asserting queue
    channel.sendToQueue(queueName, Buffer.from(data));  // sending queue name and payload to queue.
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};

export const workerFunction = async (channel, queuename, data) => {
    channel.assertQueue(queuename, { durable: true });
    channel.sendToQueue(queuename, Buffer.from(data), { persistent: true });
    console.log("Sent '%s'", data);
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};

export const exchangeFunction = async (channel, exchange, data) => {
    channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(data));
    console.log("Sent %s", data);
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};

export const directExchange = async (channel, exchange, severity, data) => {
    channel.assertExchange(exchange, "direct", { durable: false });
    channel.publish(exchange, severity, Buffer.from(data));
    console.log("Sent %s: '%s'", severity, data);
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};

export const topicExchange = async (channel, exchange, key, message) => {
    channel.assertExchange(exchange, "topic", { durable: false });
    channel.publish(exchange, key, Buffer.from(message));
    console.log("Sent %s: '%s'", key, message);
    process.on("exit", (code) => {  // called in case channel closes unexpectedly.
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
};
