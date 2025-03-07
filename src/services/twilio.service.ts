import Twilio from 'twilio';

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const TwilioService = {
    async sendMessage(phoneNumber: string, message: string) {
        console.log(message)
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });
    }
}