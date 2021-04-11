const Discord = require('discord.js');
const exam = require('./exam');
module.exports = {
	name: 'examend',
    description: 'Ends the exam time that was ran by ~exam',
    args: false,
    examended: false,
    argsRole: '',
    execute(message, args, mentionedRole, client, con) {
        this.examended = true;

        exam.stopcommand;
        //if (message.content === "~examend"){
        message.channel.send(`Ended exam time for ${this.argsRole}`);
            //return true;
        //}
        /*else{
            return false;
        }*/
    },
};
