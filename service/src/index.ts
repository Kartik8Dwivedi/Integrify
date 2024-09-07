import { Kafka } from 'kafkajs';

const TOPIC_NAME = 'zap-events';

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
});

async function main(){
    const consumer = kafka.consumer({
        groupId: 'main-worker'
    });
    await consumer.connect();
    
    await consumer.subscribe({
        topic: TOPIC_NAME,
        fromBeginning: true,
    });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
            // todo send email
            await new Promise((resolve) => setTimeout(resolve, 5000));
            console.log("Processing done")
            // commit the message to kafka
            await consumer.commitOffsets([
                { 
                    topic: TOPIC_NAME, 
                    partition: partition, 
                    offset: (parseInt(message.offset) + 1).toString()
                },
            ]);
        },
    });
}

main();