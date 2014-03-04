'use strict';

// Create the configuration
var config = {
	channels: ["#orbitdelmundo"],
	server: "irc.eversible.com",
	botName: "robotnik"
};

// Get the lib
var irc = require("irc");
var handler = require('./CommandHandler').handler;

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});
handler.init(bot);

// Listen for joins
bot.addListener("join", function(channel, who) {
	// Welcome them in!
	bot.say(channel, 'Welcome ' + channel + ' - ' + who + ' is here to help');
});


