//const keepAlive = require('./server');
const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv-flow').config();
const mysql = require('mysql');
const { setInterval } = require('timers');
const config = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    owner: process.env.OWNER,
    mysqlpass: process.env.MYSQLPASS
};

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.generateInvite({
        permissions: ["ADMINISTRATOR"],
    }).then(console.log);
});


var con = mysql.createConnection({
    host: "tcp://4.tcp.ngrok.io:18416",
    user: "root",
    password: config.mysqlpass,
    database: "reminders"
});
con.connect(err => {
    if(err){
        throw err;
    }
    console.log('Connected to database!')
});
con.query("DESCRIBE events", console.log);
bot.on('message', message => {

    if (!message.content.startsWith(config.prefix) || message.author.bot){
        return;
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ /);
    const argsFeed = message.content.slice(1).trim().split(/ /);
    argsFeed.shift();
    const commandName = args.shift().toLowerCase();    
    if (message.channel.type == "dm") {
        console.log("dm recieved");
        if (message.content.toLowerCase().startsWith("~fb") || message.content.toLowerCase().startsWith("~feedback")) {  
            console.log("command yes");
            console.log(argsFeed);
            let messageAttachments = [];
            for (let op = 0; op < message.attachments.size; op++) {
                const element = message.attachments.array()[op].url;
                messageAttachments.push(element);
            }
            //IMAGEEE

            if (argsFeed[0]){
                let eventdatastring2 = '';
                for (let kiod = 0;kiod <= args.length - 1;kiod++){
                    eventdatastring2 += (args[kiod] + " ");
                }
                console.log("argsfeed");
                const hook = new Discord.WebhookClient('785244545272774717', 'ZA3LiVO3t2s5hZVPWf4bO6KEYh9Q5jiz6pel7hBTD0abQo1l32XTwBaLa7YlFJYuvJ0S');
                // Send a message using the webhook
                hook.send(`**Feedback from ${message.author.tag}:** ${eventdatastring2}\nAttachments: ${messageAttachments}`);
                return message.channel.send('Thank\'s for your feedback!');
            }
            else {
                return message.channel.send('Proper usage: `~feedback <Feedback message>`');
            }
        }
    }
    if (!bot.commands.has(commandName)){
        return;
    }
    const command = bot.commands.get(commandName);
    if (command.args && !args.length && command.optional == false) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
			reply = command.usage;
    	}
        return message.channel.send(reply);
    }    
    function getUserFromMention(mention) {
        if (!mention){
            return;
        }
        if (mention.startsWith('<@&') && mention.endsWith('>')) {
            mention = mention.slice(3, -1);
            //es-lint empty
            return message.guild.roles.cache.get(mention);
        }
    }
    if (message.content == "~examend"){
        return;
    }
    try {
        command.execute(message, args, getUserFromMention(args[0]), bot, con);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
//keepAlive();
bot.login(config.token);
