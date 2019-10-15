import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (err, conn) => {
    if (err) { throw err; }
    conn.createChannel((err1, ch) => {
        if (err1) { throw err1; }
        ch.assertQueue("worker", { durable: true });
        ch.consume("worker", (msg) => {
            const seconds = msg.content.toString().split(".").length - 1;
            console.log("Recieved %s", msg.content.toString());
            setTimeout(() => {
                console.log("Done");
            }, seconds * 1000);
        }, { noAck: true });
    });
});
