'use strict';

var CommandHandler = function(bot) {
	this.bot = bot;
	console.log('bot handler initialized');


	// Listen for any message, say to him/her in the room:
	bot.addListener("message", function(from, to, text, message) {
		if(to.indexOf('#') === 0) {
			_helper.handleCommand(from, to, text, message);
		} else {
			console.log('message came in (from ' + from + '): ' + text);
		}
	});

	// Listen for private messages and respond back that we're a bot:
	bot.addListener('pm', function (from, message) {
	    _helper.handlePrivateMessage(from, message);
	});


	var _helper = {

		//
		// Command handler:
		//
		handleCommand: function(from, to, text, message) {
			console.log('from: ' + from);
			console.log('to:   ' + to);
			console.log('text: ' + text);
			// console.log('message: ' + JSON.stringify(message));
			// bot.say(config.channels[0], "What does that mean: '" + text + "' ?");

			var command = _helper.getCommand(text);
			var args = _helper.getParams(text);
			
			if(typeof command !== 'undefined') {

				// bot.say(to, 'Dude, you want me to ' + command + ', yo?');
				if(command==='count') {

					bot.say(to, 'Dude, I can count to ' + args[1] + ' yo.');
					for(var i=0; i<args[1];i++) {
						bot.say(to, '' + (i+1));
					}
				} else {
					bot.say(to, 'Dude, you want me to ' + command + ', yo?');
				}
			} else {
				console.log('no command');
			}
		},

		// What do do when someone PMs me:
		handlePrivateMessage: function(from, message) {
			bot.say(from, 'Dude, I\'m a bot, yo');
		},

		/** Gets you the command.  */
		getCommand: function(text) {

			var parts = text.split(' ');
			if(typeof(parts) !== 'undefined') {
				if(parts[0].indexOf('!')===0) {
					return parts[0].substring(1);
				}
			}
		},

		/** Gets you the parameters for the command.  */
		getParams: function(text) {
			var parts = text.split(' ');
			if(typeof(parts) !== 'undefined') {
				return parts.slice(1);
			}
		}
	};

}


exports.handler = {
  init: function(bot) {
    return new CommandHandler(bot);
  }
};

