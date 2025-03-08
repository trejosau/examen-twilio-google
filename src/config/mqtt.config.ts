import mqtt, { MqttClient } from 'mqtt';
import { getIO } from '../server';

const brokerUrl: string = 'mqtt://18.191.91.135:1883';

const options: mqtt.IClientOptions = {
    username: 'saulssl',
    password: '232312',
    clientId: `node-client-${Math.random().toString(16).slice(2, 10)}`,
};

const client: MqttClient = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    const topics = ['test/topic'];
    client.subscribe(topics, { qos: 1 }, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topics: ${topics.join(', ')}`);
        }
    });
});

client.on('message', (topic: string, message: Buffer) => {
    const msg = message.toString();
    console.log(`Message received on '${topic}': ${msg}`);
    getIO().emit('mqtt-message', { topic, message: msg });
});

client.on('error', (error: Error) => {
    console.error('MQTT connection error:', error);
});

client.on('close', () => {
    console.log('MQTT connection closed');
});

export default client;
