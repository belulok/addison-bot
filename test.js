const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/discord-bot-2023', { useNewUrlParser: true, useUnifiedTopology: true });
const prefixes = mongoose.model('prefixes', new mongoose.Schema({
    guildId: String,
    prefix: String
}));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;

    // Get the prefix from the database
    const prefixData = await prefixes.findOne({ guildId: message.guild.id });
    const prefix = prefixData ? prefixData.prefix : '.';

    // Check if the message triggers the ping command
    if (message.content.startsWith(prefix + 'ping')) {
        message.reply('Pong!');
    }

    // Check if the message triggers the prefix change command
    if (message.content.startsWith(prefix + 'setprefix ')) {
        // Get the new prefix from the message content
        const newPrefix = message.content.slice(prefix.length + 10);

        // Update the prefix in the database
        const filter = { guildId: message.guild.id };
        const update = { prefix: newPrefix };
        await prefixes.findOneAndUpdate(filter, update, { upsert: true });

        // Confirm the prefix change to the user
        message.reply(`My prefix has been updated to "${newPrefix}".`);
    }

    // Check if the message is a direct message to the bot
    if (message.content.startsWith(prefix + 'dm')) {

        // Respond to the message
        message.reply(`I'll send you a direct message!`);

        // Send a direct message to the user
        message.author.send(`Hi there! You triggered me in the server "${message.guild.name}"`)
            .catch(error => {
                console.error(`Could not send direct message to ${message.author.tag}.`, error);
                message.reply(`I couldn't send you a direct message. Please make sure you have direct messages enabled.`);
            });
    }
});

client.login("OTM0MzM1OTQ5MDcxMDY5MTg0.GDYT7y.SY1MjsoG2DsNHa3xv555dVxqMZ33xPeG4lB77k");