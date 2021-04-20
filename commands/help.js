const Discord = require('discord.js');
let helpEmbed = new Discord.MessageEmbed();
helpEmbed.setColor('GOLD');
helpEmbed.setTitle('Squad Bot');
helpEmbed.setThumbnail('https://i.ibb.co/C8vDSXg/Squad-Bot-Pfp.png');
helpEmbed.setDescription('Hello! Squad Bot is a minor, multi-purpose Discord bot aimed for assisting small servers meant for school communites. Since the bot is recent, there will be many more featuers to come, but may undergo quite a lot of bugs/errors. Please report any bugs, feedback or wanted features by DMing `~fb <Feedback message>` to Squad Bot.');
helpEmbed.addField('~reminder', 'The reminder command is a simple calender-like system where users can input a time, information, and a role the reminder applies to.');
helpEmbed.addField('~exam and ~examend', 'The exam system is for muting users with a specific role during an exam, except if the message is important.');
helpEmbed.addField('~time', "With the time command, users can get the current time of any supported timezone, and set their own server's timezone.");
helpEmbed.addField(`~measurements`, "A command for finding and converting common mathematical measurements.");
helpEmbed.addField(`~translate`, "A command for translating text to another language.");
module.exports = {
	name: 'help',
    	description: 'Starts exam time for students with mentioned role.',
    	args: false,
	optional: false,
	execute(message, args, mentionedRole, client, con) {
        let maker = client.users.cache.get('688569145431687178');
        helpEmbed.setFooter(`Created by: ${maker.tag}`, 'https://i.ibb.co/2cmRsPG/da3379157492e6397756f81352fd55a2.webp');
        return message.channel.send(helpEmbed);
    }
}
