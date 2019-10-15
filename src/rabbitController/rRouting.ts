import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (err, conn) => {
    if (err) { throw err; }
    conn.createChannel((err1, ch) => {
        if (err1) { throw err1; }
        ch.assertExchange("exchange1", "direct", { durable: false });
        ch.assertQueue("", { exclusive: true }, (err2, q) => {
            if (err2) { throw err2; }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            const args = process.argv.slice(2);
            args.forEach((severity) => {
                ch.bindQueue(q.queue, "exchange1", severity);
            });
            ch.consume(q.queue, (msg) => {
                if (msg.content) {
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                }
            }, { noAck: true });
        });
    });
});
