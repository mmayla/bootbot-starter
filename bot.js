/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */
const BootBot = require('bootbot');
const fs = require('fs');
const path = require('path');
const env = require('node-env-file');

env(path.join(__dirname, '/.env'));

if (!process.env.page_token) {
  console.error('Error: Specify a Facebook page_token in environment.');
  process.exit(1);
}

if (!process.env.verify_token) {
  console.error('Error: Specify a Facebook verify_token in environment.');
  process.exit(1);
}

if (!process.env.app_secret) {
  console.error('Error: Specify a Facebook app_secret in environment.');
  process.exit(1);
}

const bot = new BootBot({
  accessToken: process.env.page_token,
  verifyToken: process.env.verify_token,
  appSecret: process.env.app_secret,
});

bot.setGreetingText('Hey there! Welcome to BootBot!');
bot.setGetStartedButton((payload, chat) => {
  chat.say('Welcome to BootBot. What are you looking for?');
});
bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Help',
    payload: 'PERSISTENT_MENU_HELP',
  },
  {
    type: 'postback',
    title: 'Settings',
    payload: 'PERSISTENT_MENU_SETTINGS',
  },
  {
    type: 'web_url',
    title: 'Go to Website',
    url: 'http://yostik.io',
  },
]);

// add all modules in modules/
const normalizedPath = path.join(__dirname, 'modules');
fs.readdirSync(normalizedPath).forEach((file) => {
  const module = require(path.join(normalizedPath, file));
  bot.module(module);
});

bot.start(process.env.PORT);
