const Discord = require('discord.js');
const jgfyyyqrufr78 = require('./jgfyyyqrufr78');
const similarstring = require('string-similarity');
let usageEmbed = new Discord.MessageEmbed();
let monthsmin = 0;
let daysmin = 0;
let hoursmin = 0;
let minutesmin = 0;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
usageEmbed.setTitle('Usage for Reminder command:');
usageEmbed.setColor('NAVY');
usageEmbed.addField('Command', '~reminder');
usageEmbed.addField('1st argument', '`add` or `delete` or none for reminder list');
usageEmbed.addField('2nd argument', 'If `add`, mention the role the reminder applies to. If `delete`, send the reminder info.');
usageEmbed.addField('3rd argument', '`xh`, where x is the time of day to be reminded in hours (x should be from 1 to 24)');
usageEmbed.addField('4th argument', '`xm`, where x is the time of day to be reminded in minutes after hours (x should be from 1 to 59)');
usageEmbed.addField('5th argument', '`mmddyyyy`, where mm is the month of year to be reminded (mm should be from 01 to 12), dd is the day of year to be reminded (dd should be from 01 to 30/31 depending on month, and yyyy is the *current* year.\n**Warning:** It is recommended to not store reminders at the beginning/ending days of the year, as your reminder may not alert your role.');
usageEmbed.addField('6th argument and on', 'your reminder info');
let d = new Date();
let callArray = ["get", "UTC"];
let array3;
let initID = 0;
setInterval(function(){
    d = new Date();
    d.getUTCFullYear
}, 60000);
//1st is mentioned role, 2nd is time hour, 3rd is time minutes, 4th is date (01042007), 5th is event string
module.exports = {
    name: 'reminder',
    description: 'Reminder for reminding and storing events.',
    args: true,
	usage: usageEmbed,
    optional: true,
    testexe(test_array3){
        array3 = test_array3;
    },
    execute(message, args, mentionedRole, client, con){
        function getRoleFromMention(mention) {
            if (!mention){
                return message.channel.send("Argument 1 must be a mentioned role!");
            }
            if (mention.startsWith('<@&') && mention.endsWith('>')) {
                mention = mention.slice(3, -1);
                //es-lint empty
                return message.guild.roles.cache.get(mention);
            }
        }
        if (args[0]){
            if (args[0].toLowerCase() == 'add'){


                if (args[1]){
                    const eventrole = getRoleFromMention(args[1]);
                    if (args[2]){
                        const eventhour = args[2].slice(0, -1);
                        if (parseInt(eventhour) < 1 || parseInt(eventhour) > 24){
                            return message.channel.send('Provide a valid hour!');
                        }
                        if (args[3]){                    
                            const eventminute = args[3].slice(0, -1);
                            if (parseInt(eventminute) < 0 || parseInt(eventminute) > 59){
                                return message.channel.send('Provide a valid minute!');
                            }
                            if (args[4]){
                                const eventdate = args[4];
                                if (parseInt(eventdate.slice(4, 8)) != d.getUTCFullYear()){
                                    return message.channel.send('Year must be the current year!');
                                }
                                
                                if (!(01 <= (parseInt(eventdate.slice(0, 2))) <= 12)){
                                    return message.channel.send('Please provide a valid month!');
                                }
                                if (!(d.getUTCDate() <= (parseInt(eventdate.slice(2, 4))) <= 30)){// CHECK IS UTC DAY IS PAST
                                    return message.channel.send('Please provide a valid day!');
                                }
                                if (parseInt(eventdate.slice(0, 2), 10) != d.getUTCMonth() + 1) {
                                    return message.channel.send(`The month of the event must be in ${months[d.getUTCMonth()]}!`);
                                }
                                if (args[5]){
                                    let eventdatastring = '';
                                    for (let kio = 5;kio <= args.length - 1;kio++){
                                        eventdatastring += (args[kio] + " ");
                                    }
                                    function integ() {         
                                        initID = Math.floor(Math.random() * (10**8));                               
                                        con.query(`SELECT DISTINCT eventid FROM events`, (err, rows) => {
                                            if (err) {
                                                console.error(err);
                                            }
                                            rows.forEach(value => {
                                                if (value.eventid == initID) {
                                                    return integ();                                                    
                                                }
                                            });
                                        });
                                        return integ2(initID);
                                    }
                                    function integ2(id) {
                                        return id;
                                    }
                                    con.query(`INSERT INTO events (roleid, time, timemin, date, eventdata, guildid, channelid, eventid) VALUES (${eventrole.id}, ${eventhour}, ${eventminute}, ${eventdate}, "${eventdatastring}", ${message.guild.id}, ${message.channel.id}, ${integ()})`, (err) => {
                                        if (err){   
                                            throw err;
                                        }
                                        message.channel.send(`Event \"${eventdatastring}\" successfully added to your reminders!`);
                                        onEventPassed();
                                    });
                                    function onEventPassed(){
                                        con.query(`SELECT * FROM events`, (err, rows) => {
                                            if (err) {
                                                throw err;
                                            }
                                            if (rows.length == 0) {
                                                return;
                                            }
                                            let days = [];
                                            let months = [];
                                            let hours = [];
                                            let minutes = [];
                                            //IF EVENTS NULL
                                            rows.forEach(function(value, index){
                                                if (value.date.toString().length == 7) {
                                                    months.push(parseInt(value.date.toString().slice(0, 1)));
                                                }
                                                else if (value.date.toString().length == 8) {
                                                    months.push(parseInt(value.date.toString().slice(0, 2)));
                                                }
                                            });
                                            monthsmin = Math.min(...months);  
                                            for (let k = 0; k < rows.length; k++) {
                                                const value = rows[k];
                                                if (value.date.toString().length == 7) {
                                                    if (parseInt(value.date.toString().slice(0, 1)) != monthsmin) {
                                                        continue;
                                                    }
                                                    days.push(parseInt(value.date.toString().slice(1, 3)));
                                                }
                                                else if (value.date.toString().length == 8) {
                                                    if (parseInt(value.date.toString().slice(0, 2)) != monthsmin) {
                                                        continue;
                                                    }
                                                    days.push(parseInt(value.date.toString().slice(2, 4)));
                                                }                                                
                                            }
                                            daysmin = Math.min(...days);
                                            for (let i = 0; i < rows.length; i++) {
                                                const value = rows[i];
                                                if (value.date.toString().length == 7) {
                                                    if (parseInt(value.date.toString().slice(1, 3)) != daysmin) {
                                                        continue;
                                                    }
                                                    const tset = hours.push(parseInt(value.time.toString()));
                                                }
                                                else if (value.date.toString().length == 8) {
                                                    if (parseInt(value.date.toString().slice(2, 4)) != daysmin) {
                                                        continue;
                                                    }
                                                    hours.push(parseInt(value.time.toString()));
                                                }
                                            }
                                            hoursmin = Math.min(...hours);
                                            for (let q = 0; q < rows.length; q++) {
                                                const value = rows[q];
                                                if (parseInt(value.time.toString()) != hoursmin) {
                                                    continue;
                                                }
                                                minutes.push(parseInt(value.timemin.toString()));
                                                if (parseInt(value.time.toString()) != hoursmin) {
                                                    continue;
                                                }
                                                minutes.push(parseInt(value.timemin.toString()));
                                                
                                            }
                                            minutesmin = Math.min(...minutes);
                                        });
                                        
                                    }
                                    setInterval(function(){
                                        onEventPassed();
                                        let guild_id = 0;

                                        if(daysmin.toString().length == 1){
                                            try{
                                                con.query(`SELECT * FROM events WHERE time = ${hoursmin} AND timemin = ${minutesmin} AND date = ${monthsmin}0${daysmin}${d.getUTCFullYear()}`, (err, rows) => {
                                                    //CHECK IF THIS IS NULL ^^^^^
                                                    //try catch
                                                    if (err){
                                                        throw err; 
                                                    }
                                                    if (rows.length == 0){
                                                        return;
                                                    }
                                                    for (let p = 0; p < rows.length; p++) {
                                                        const value = rows[p];
                                                        guild_id = value.guildid;
                                                        jgfyyyqrufr78.execute(message, args, mentionedRole, client, con, guild_id, callArray);
                                                        if (!array3) {
                                                            continue;
                                                        }
                                                        else{

                                                        }

                                                        if (d.getUTCMonth() + 1 >= monthsmin && d.getUTCDate() + array3[2] >= daysmin && array3[0] >= hoursmin && array3[1] >= minutesmin) {
                                                            let roleidFrom = value.roleid;
                                                            let eventdataFROM = value.eventdata;
                                                            let channelidFROM = value.channelid;
                                                            try {
                                                                con.query(`DELETE FROM events WHERE time = ${hoursmin} AND timemin = ${minutesmin} AND date = ${monthsmin}0${daysmin}${d.getUTCFullYear()} AND roleid = ${value.roleid} AND guildid = ${value.guildid} AND channelid = ${value.channelid}`, (err) => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            } catch (err){
                                                                console.error(err);
                                                            }
                                                            let formbool = true;
                                                            if (formbool) {
                                                                formbool = false;
                                                                return client.channels.cache.get(channelidFROM).send(`<@&${roleidFrom}>, it's time for ${eventdataFROM}!`);
                                                            }
                                                        }                                         
                                                    }
                                                });
                                            }
                                            catch (er){
                                                console.error(er);
                                            }
                                        }
                                        
                                        else {
                                            try{
                                                con.query(`SELECT * FROM events WHERE time = ${hoursmin} AND timemin = ${minutesmin} AND date = ${monthsmin}${daysmin}${d.getUTCFullYear()}`, (err, rows) => {
                                                    //CHECK IF THIS IS NULL ^^^^^
                                                    //try catch
                                                    if (err){
                                                        throw err; 
                                                    }
                                                    if (rows.length == 0){
                                                        return;
                                                    }
                                                    for (let p = 0; p < rows.length; p++) {
                                                        const value = rows[p];
                                                        guild_id = value.guildid;
                                                        jgfyyyqrufr78.execute(message, args, mentionedRole, client, con, guild_id, callArray);
                                                        if (!array3) {
                                                            continue;
                                                        }
                                                        else{

                                                        }

                                                        if (d.getUTCMonth() + 1 >= monthsmin && d.getUTCDate() + array3[2] >= daysmin && array3[0] >= hoursmin && array3[1] >= minutesmin) {
                                                            let roleidFrom = value.roleid;
                                                            let eventdataFROM = value.eventdata;
                                                            let channelidFROM = value.channelid;
                                                       
                                                            try {
                                                                con.query(`DELETE FROM events WHERE time = ${hoursmin} AND timemin = ${minutesmin} AND date = ${monthsmin}${daysmin}${d.getUTCFullYear()} AND roleid = ${value.roleid} AND guildid = ${value.guildid} AND channelid = ${value.channelid}`, (err) => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            } catch (err){
                                                                console.error(err);
                                                            }
                                                            let formbool = true;
                                                            if (formbool) {
                                                                formbool = false;
                                                                return client.channels.cache.get(channelidFROM).send(`<@&${roleidFrom}>, it's time for ${eventdataFROM}!`);
                                                            }
                                                        }                                         
                                                    }
                                                });
                                            }
                                            catch (er){
                                                console.error(er);
                                            } 
                                        }
                                        
                                    }, 10000);
                                }
                                else {
                                    message.channel.send(usageEmbed);
                                }
                            }
                            else {
                                message.channel.send(usageEmbed);
                            } 
                        }
                        else {
                            message.channel.send(usageEmbed);
                        }
                    }
                    else {
                        message.channel.send(usageEmbed);
                    }
                }
                else {
                    message.channel.send(usageEmbed);
                }

            }
            else if (args[0].toLowerCase() == 'delete'||args[0].toLowerCase() == 'del'){

                if (args[1]) {
                    let eventdatastring1 = '';
                    for (let kiod = 1;kiod <= args.length - 1;kiod++){
                        eventdatastring1 += (args[kiod] + " ");
                    }
                    //DELETE
                    con.query(`SELECT DISTINCT eventdata FROM events WHERE guildid = ${message.guild.id}`, (err, rows) => {
                        if (err) {
                            console.error(err);
                        }
                        let nos = 0;
                        rows.forEach(value => {
                            console.log(similarstring.compareTwoStrings(eventdatastring1, value.eventdata));
                            if (similarstring.compareTwoStrings(eventdatastring1, value.eventdata) >= 0.905) {
                                nos = value.eventdata;
                                con.query(`DELETE FROM events WHERE eventdata = \"${value.eventdata}\"`, (er) => {
                                    if (er) {
                                        console.error(er);
                                    }
                                });
                            }
                            else {
                                nos++;
                            }
                        });//NO SIMILAR
                        if (nos == rows.length) {
                            return message.channel.send(`Reminder \"${eventdatastring1}\" not found.`);
                        }
                        else if(typeof nos == "string"){
                            return message.channel.send(`Reminder \"${nos}\" deleted.`);
                        }
                    });
                }
                else {
                    message.channel.send(usageEmbed);
                }
            }
        }
        else {
            //CHECK IF REMINDERS ARE NULL FOR THIS GUILD
            let reminderEmbed = new Discord.MessageEmbed();
            reminderEmbed.setTitle(`Reminders for ${message.guild.name}`);
            reminderEmbed.setColor('NAVY');
            con.query(`SELECT DISTINCT timezone FROM timezones WHERE guildid = ${message.guild.id}`, (err1, rows1) => {
                if (err1) {
                    console.error(err);
                }
                con.query(`SELECT * FROM events`, (err, rows) => {
                    if (err) {
                        console.error(err);
                    }
                    rows.forEach(value => {
                        if (value.guildid == message.guild.id) {
                            let vTime = value.time;
                            let sec = "AM";
                            if (value.time > 12) {
                                vTime -= 12;
                                sec = "PM";
                            }
                            reminderEmbed.addField(`${value.eventdata}`, `Time: ${vTime}:${('0'+value.timemin).slice(-2)} ${sec} ${rows1[0].timezone}\nRole: ${client.guilds.cache.get(value.guildid).roles.cache.get(value.roleid).name}`);
                        } else {
                            return message.channel.send('This server does not have any set reminders.');
                        }
                    });
                    return message.channel.send(reminderEmbed);
                });
            });
            



            
            //calendar
        }
    }
}
