const mineflayer = require('mineflayer');
const readline = require('readline');

// Credentials
const username = 'xBHR';
const password = 'iiiMM';

// Create the bot
const bot = mineflayer.createBot({
  host: 'blocksmc.com',
  port: 25565,
  username: username, // cracked account
  version: '1.8.9',
});

// Wait 2s after spawn, then login with password
bot.once('spawn', () => {
  console.log(`[BOT] Joined the server as ${username}`);
  setTimeout(() => {
    bot.chat(`/l ${password}`);
    console.log(`[BOT] Sent login command /l ${password}`);
  }, 2000);

  startRandomMovement();
});

// Show chat messages in terminal
bot.on('chat', (username, message) => {
  console.log(`[CHAT] <${username}>: ${message}`);
});

// Terminal input to chat in-game
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.trim() !== '') {
    bot.chat(input);
  }
});

// Random movement function
function startRandomMovement() {
  setInterval(() => {
    const actions = ['forward', 'back', 'left', 'right'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const shouldJump = Math.random() < 0.5;

    bot.setControlState('forward', false);
    bot.setControlState('back', false);
    bot.setControlState('left', false);
    bot.setControlState('right', false);
    bot.setControlState(action, true);

    if (shouldJump) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }

    // Stop movement after random short time
    setTimeout(() => {
      bot.clearControlStates();
    }, 1000 + Math.random() * 1000);

  }, 4000); // every 4s
}
