const Discord = require('discord.js');
let usageEmbed = new Discord.MessageEmbed();
usageEmbed.setTitle('Usage for Exam command:');
usageEmbed.setColor('WHITE');
usageEmbed.addField('Command', '~exam');
usageEmbed.addField('1st argument','Role taking the exam');
const examend = require('./examend');
let collector;
let examed = false;
module.exports = {
	name: 'exam',
    description: 'Starts exam time for students with mentioned role.',
    args: true,
	usage: '<role>',
	optional: false,
	execute(message, args, mentionedRole, client, con) {
		if (args[0]) {
			const role = mentionedRole;
			if ((!role) && message.mentions.users){
				return message.reply('Please use a role when running this command.');
			}
			
			else if (!role && !message.mentions){
				return message.reply('Please use a mention when running this command.');
			}
			examed = true;
			if (examed){
				message.channel.send(`Started exam time for ${role.name}`);
				examend.argsRole = `${role.name}`;
				const filter = m => m.member.roles.cache.find(r => r === role);
				const emojiReactGuild = client.guilds.cache.get('736771129380700181');
				const reactionEmoji = emojiReactGuild.emojis.cache.find(emoji => emoji.name === 'checkcheck');
				const reactionEmoji1 = emojiReactGuild.emojis.cache.find(emoji => emoji.name === 'crosscross');
				collector = message.channel.createMessageCollector(filter);
				if (collector.ended){
					collector.collect();
				}
				collector.on('collect', async (m) => {
					/*if(examend.examended || examend.execute(m, null, null, null)){
						collector.stop();
						return;
					}*/
					if (examend.examended == true){
						examend.examended = false;
					}
					if (m.content === "~examend"){
						if (examend.examended == false){
							examend.execute(m, null, null, null);
							collector.stop();
							return;
						}
					}
					m.delete();
					let examWarningMsg = await message.channel.send(`${m.author.tag}, you are currently in an exam. Are you sure you want to send this message?`);
					await examWarningMsg.react(reactionEmoji);
					await examWarningMsg.react(reactionEmoji1);
					client.on('messageReactionAdd', (reaction, user) => {
						if(reaction.message === examWarningMsg){
							if (reaction.users.cache.has(m.author) || user === m.author){
								if (reaction.emoji === reactionEmoji){
									//he checked yes
									
									reaction.message.delete();
									const examMessage = new Discord.MessageEmbed().setTitle(`${m.author.tag}'s message was: ` + m.content);
									message.channel.send(examMessage);
								}
								else if (reaction.emoji === reactionEmoji1){
									//he check no
									reaction.message.delete();
								}
							} 
						}
						else {
							return;
						}
					});
				});			
			}
		}
		else {
			message.channel.send(`You're missing a role for the next argument!`);
		}
		
	},
	stopcommand() {
		collector.stop();
	},

};