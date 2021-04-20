const Discord = require('discord.js');
const translate = require('google-translate-api');
let usageEmbed = new Discord.MessageEmbed();

usageEmbed.setTitle('Usage for Translate command:');
usageEmbed.setColor('BLACK');
usageEmbed.addField('Command', '~translate');
usageEmbed.addField('1st argument', '2-letter word representing the language you want to translate to (ex. `en`)');
usageEmbed.addField('2nd argument', 'Text you want to translate');
module.exports = {
	  name: 'translate',
    description: 'Translates languages.',
    args: true,
    usage: usageEmbed,
	  optional: false,
	  async execute(message, args, mentionedRole, client, con) {
        let language = args[0];
        let text = args.slice(1).join(" ");
      
        if (!language || language.length != 2 || !text){
            return usageEmbed;
        } 
        const result = await translate(text, {to: language});
        return message.channel.send(result.text);
    },
}
