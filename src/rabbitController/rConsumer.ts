import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (err, conn) => {
    conn.createChannel((err1, ch) => {
        if (err1) { throw err1; }
        ch.assertQueue("user-messages");
        ch.consume("user-messages", (msg) => {
            console.log(".....");
            setTimeout(() => {
                console.log("Message:", msg.content.toString());
            }, 2000);
        }, { noAck: false },
        );
    });
});
