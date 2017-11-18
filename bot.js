const BootBot = require('bootbot');
const env = require('node-env-file');

env(__dirname + '/.env');

if (!process.env.page_token) {
    console.log('Error: Specify a Facebook page_token in environment.');
    process.exit(1);
}

if (!process.env.verify_token) {
    console.log('Error: Specify a Facebook verify_token in environment.');
    process.exit(1);
}

if (!process.env.app_secret) {
    console.log('Error: Specify a Facebook app_secret in environment.');
    process.exit(1);
}

const bot = new BootBot({
  accessToken: process.env.page_token,
  verifyToken: process.env.verify_token,
  appSecret: process.env.app_secret,
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();
