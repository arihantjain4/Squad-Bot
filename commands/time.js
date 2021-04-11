//ADD SUPPORT FOR DAYLIGHT TIMES TOO

const Discord = require('discord.js');
let usageEmbed = new Discord.MessageEmbed();

usageEmbed.setTitle('Usage for Time command:');
usageEmbed.setColor('GREY');
usageEmbed.addField('Command', '~time');
usageEmbed.addField('1st argument', '`set` (set your server\'s time zone), or `get` (get the current time for a timezone)');
usageEmbed.addField('2nd argument','Time zone: `SGT` or `AKT` or `PST` or `MST` or `CST` or `CDT` or `EST` or `AST` or `CEST` or `IST` or `UTC`');
module.exports = {
    name: 'time',
    description: 'Displays time for common time zones (USA), and some international.',
    args: true,
    usage: usageEmbed,
    optional: false,
    times: {},
    execute(message, args, mentionedRole, client, con){
        let set = args[0].toLowerCase() == "set";
        let get = args[0].toLowerCase() == "get";
        if (set || get) {
            if (args[1]){
                const d = new Date();
                let uniHour = d.getUTCHours()+1;
                
                const uniMin = d.getUTCMinutes();
                switch (args[1]){
                    case 'SGT':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });
                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "SGT")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });
                        }
                        //singapore time, utc+8
                        if (get) {
                            let SGThour = uniHour + 8;
                            let SGTmin = uniMin;
                            let dayChange = 0;
                            if(0 < SGThour && SGThour <= 12){
                                //am
                                if (SGThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [SGThour, SGTmin, dayChange];
                                    }
                                    return message.channel.send(`Singapore Time (SGT) - ${SGThour}:${SGTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [SGThour, SGTmin, dayChange];
                                }
                                return message.channel.send(`Singapore Time (SGT) - ${SGThour}:${SGTmin} AM`);
                            }
                            else if (SGThour >= 24){
                                SGThour -= 24;
                                dayChange++;
                                if (SGThour > 12){
                                    //pm
                                    SGThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [SGThour, SGTmin, dayChange];
                                    }
                                    return message.channel.send(`Singapore Time (SGT) - ${SGThour}:${SGTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [SGThour, SGTmin, dayChange];
                                }
                                return message.channel.send(`Singapore Time (SGT) - ${SGThour}:${SGTmin} AM`);
                            }
                            else if (SGThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [SGThour, SGTmin, dayChange];
                                }
                                SGThour -= 12;
                                
                                return message.channel.send(`Singapore Time (SGT) - ${SGThour}:${SGTmin} PM`);
                            }
                            else if (SGThour <= 0) {
                                SGThour = 24 - Math.abs(SGThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [SGThour, SGTmin, dayChange];
                                }
                                return message.channel.send(`Singapore Time (SGT)  -  ${SGThour}:${SGTmin} PM`);
                            }                             
                        }
                        break;
                    case 'AKT':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "AKT")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        //alaska time, utc-9
                        if (get){
                            let AKThour = uniHour - 9;
                            let AKTmin = uniMin;
                            let dayChange = 0;
                            if(0 < AKThour && AKThour <= 12){
                                //am
                                if (AKThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [AKThour, AKTmin, dayChange];
                                    }
                                    return message.channel.send(`Alaska Time (AKT) - ${AKThour}:${AKTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [AKThour, AKTmin, dayChange];
                                }
                                return message.channel.send(`Alaska Time (AKT) - ${AKThour}:${AKTmin} AM`);
                            }
                            else if (AKThour >= 24){
                                AKThour -= 24;
                                dayChange++;
                                if (AKThour > 12){
                                    //pm
                                    AKThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [AKThour, AKTmin, dayChange];
                                    }
                                    return message.channel.send(`Alaska Time (AKT) - ${AKThour}:${AKTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [AKThour, AKTmin, dayChange];
                                }
                                return message.channel.send(`Alaska Time (AKT) - ${AKThour}:${AKTmin} AM`);
                            }
                            else if (AKThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [AKThour, AKTmin, dayChange];
                                }
                                AKThour -= 12;
                                
                                return message.channel.send(`Alaska Time (AKT) - ${AKThour}:${AKTmin} PM`);
                            }
                            else if (AKThour <= 0){
                                AKThour = 24 - Math.abs(AKThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [AKThour, AKTmin, dayChange];
                                }
                                return message.channel.send(`Alaska Time (AKT)  -  ${AKThour}:${AKTmin} PM`);
                            }

                        }
                        break;
                    case 'PST':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "PST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        //pacific standard time, utc-8
                        if (get){
                            let PSThour = uniHour - 8;
                            let PSTmin = uniMin;
                            let dayChange = 0;
                            if(0 < PSThour && PSThour <= 12){
                                //am
                                if (PSThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [PSThour, PSTmin, dayChange];
                                    }
                                    return message.channel.send(`Pacific Standard Time (PST) - ${PSThour}:${PSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [PSThour, PSTmin, dayChange];
                                }
                                return message.channel.send(`Pacific Standard Time (PST) - ${PSThour}:${PSTmin} AM`);
                            }
                            else if (PSThour >= 24){
                                PSThour -= 24;
                                dayChange++;
                                if (PSThour > 12){
                                    //pm
                                    PSThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [PSThour, PSTmin, dayChange];
                                    }
                                    return message.channel.send(`Pacific Standard Time (PST) - ${PSThour}:${PSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [PSThour, PSTmin, dayChange];
                                }
                                return message.channel.send(`Pacific Standard Time (PST) - ${PSThour}:${PSTmin} AM`);
                            }
                            else if (PSThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [PSThour, PSTmin, dayChange];
                                }
                                PSThour -= 12;
                                
                                return message.channel.send(`Pacific Standard Time (PST) - ${PSThour}:${PSTmin} PM`);
                            }
                            else if (PSThour <= 0){
                                PSThour = 24 - Math.abs(PSThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [PSThour, PSTmin, dayChange];
                                }
                                return message.channel.send(`Pacific Standard Time (PST)  -  ${PSThour}:${PSTmin} PM`);
                            }
                        }
                        break;
                    case 'MST':
                        //Mountain Standard time, utc-7
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "MST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        if(get){
                            let MSThour = uniHour - 7;
                            let MSTmin = uniMin;
                            let dayChange = 0;
                            if(0 < MSThour && MSThour <= 12){
                                //am
                                if (MSThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [MSThour, MSTmin, dayChange];
                                    }
                                    return message.channel.send(`Mountain Standard Time (MST) - ${MSThour}:${MSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [MSThour, MSTmin, dayChange];
                                }
                                return message.channel.send(`Mountain Standard Time (MST) - ${MSThour}:${MSTmin} AM`);
                            }
                            else if (MSThour >= 24){
                                MSThour -= 24;
                                dayChange++;
                                if (MSThour > 12){
                                    //pm
                                    MSThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [MSThour, MSTmin, dayChange];
                                    }
                                    return message.channel.send(`Mountain Standard Time (MST)  -  ${MSThour}:${MSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [MSThour, MSTmin, dayChange];
                                }
                                return message.channel.send(`Mountain Standard Time (MST)  -  ${MSThour}:${MSTmin} AM`);
                            }
                            else if (MSThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [MSThour, MSTmin, dayChange];
                                }
                                MSThour -= 12;
                                
                                return message.channel.send(`Mountain Standard Time (MST)  -  ${MSThour}:${MSTmin} PM`);
                            }
                            else if (MSThour <= 0){
                                MSThour = 24 - Math.abs(MSThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [MSThour, MSTmin, dayChange];
                                }
                                return message.channel.send(`Mountain Standard Time (MST)  -  ${MSThour}:${MSTmin} PM`);
                            }
                        }
                        break;
                    case 'CST':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "CST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        //Central Standard time, utc+8
                        if (get){
                            let CSThour = uniHour - 6;
                            let CSTmin = uniMin;
                            let dayChange = 0;
                            if(0 < CSThour && CSThour <= 12){
                                //am
                                if (CSThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [CSThour, CSTmin, dayChange];
                                    }
                                    return message.channel.send(`Central Standard Time (CST) - ${CSThour}:${CSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CSThour, CSTmin, dayChange];
                                }
                                return message.channel.send(`Central Standard Time (CST)  -  ${CSThour}:${CSTmin} AM`);
                            }
                            else if (CSThour >= 24){
                                CSThour -= 24;
                                dayChange++;
                                if (CSThour > 12){
                                    //pm
                                    CSThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [CSThour, CSTmin, dayChange];
                                    }
                                    return message.channel.send(`Central Standard Time (CST)  -  ${CSThour}:${CSTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CSThour, CSTmin, dayChange];
                                }
                                return message.channel.send(`Central Standard Time (CST)  -  ${CSThour}:${CSTmin} AM`);
                            }
                            else if (CSThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [CSThour, CSTmin, dayChange];
                                }
                                CSThour -= 12;
                                
                                return message.channel.send(`Central Standard Time (CST)  -  ${CSThour}:${CSTmin} PM`);
                            }
                            else if (CSThour <= 0){
                                CSThour = 24 - Math.abs(CSThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [CSThour, CSTmin, dayChange];
                                }
                                return message.channel.send(`Central Standard Time (CST)  -  ${CSThour}:${CSTmin} PM`);
                            }
                        }
                        break;
                    case 'CDT':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                try {
                                    rows.forEach(value => {
                                        if (value.guildid == message.guild.id) {
                                            con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                        }
                                    });  
                                } catch (error) {
                                    console.error(error);
                                }


                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "CDT")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });
                        }
                        if (get){
                            let CDThour = uniHour - 6;
                            let CDTmin = uniMin;
                            let dayChange = 0;
                            if(0 < CDThour && CDThour <= 12){
                                if (CDThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [CDThour, CDTmin, dayChange];
                                    }
                                    return message.channel.send(`Central Daylight Time (CDT) - ${CDThour}:${CDTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CDThour, CDTmin, dayChange];
                                }
                                return message.channel.send(`Central Daylight Time (CDT) - ${CDThour}:${CDTmin} AM`);
                            }
                            else if (CDThour >= 24){
                                CDThour -= 24;
                                dayChange++;
                                if (CDThour > 12){
                                    //pm
                                    CDThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [CDThour, CDTmin, dayChange];
                                    }
                                    return message.channel.send(`Central Daylight Time (CDT) - ${CDThour}:${CDTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CDThour, CDTmin, dayChange];
                                }
                                return message.channel.send(`Central Daylight Time (CDT) - ${CDThour}:${CDTmin} AM`);
                            }
                            else if (CDThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [CDThour, CDTmin, dayChange];
                                }
                                CDThour -= 12;
                                
                                return message.channel.send(`Central Daylight Time (CDT) - ${CDThour}:${CDTmin} PM`);
                            }
                            else if (CDThour <= 0){
                                CDThour = 24 - Math.abs(CDThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [CDThour, CDTmin, dayChange];
                                }
                                return message.channel.send(`Central Daylight Time (CDT)  -  ${CDThour}:${CDTmin} PM`);
                            }
                        }
                        break;
                    case 'EST':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "EST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        if (get){
                            //Eastern Standard time, utc+8
                            let ESThour = uniHour - 5;
                            let ESTmin = uniMin;
                            let dayChange = 0;
                            if(0 < ESThour && ESThour <= 12){
                                if (ESThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [ESThour, ESTmin, dayChange];
                                    }
                                    return message.channel.send(`Eastern Standard Time (EST) - ${ESThour}:${ESTmin} PM`);
                                }
                                //am
                                if (!mentionedRole && !client) {
                                    return [ESThour, ESTmin, dayChange];
                                }
                                return message.channel.send(`Eastern Standard Time (EST) - ${ESThour}:${ESTmin} AM`);
                            }
                            else if (ESThour >= 24){
                                ESThour -= 24;
                                dayChange++;
                                if (ESThour > 12){
                                    //pm
                                    ESThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [ESThour, ESTmin, dayChange];
                                    }
                                    return message.channel.send(`Eastern Standard Time (EST) - ${ESThour}:${ESTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [ESThour, ESTmin, dayChange];
                                }
                                return message.channel.send(`Eastern Standard Time (EST) - ${ESThour}:${ESTmin} PM`);

                            }       
                            else if (ESThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [ESThour, ESTmin, dayChange];
                                }
                                ESThour -= 12;
                                
                                return message.channel.send(`Eastern Standard Time (EST) - ${ESThour}:${ESTmin} PM`);
                            }                     
                            else if (ESThour <= 0){
                                ESThour = 24 - Math.abs(ESThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [ESThour, ESTmin, dayChange];
                                }
                                return message.channel.send(`Eastern Standard Time (EST)  -  ${ESThour}:${ESTmin} AM`);
                            }
                        }
                        break;
                    case 'AST':
                        //Atlantic Standard time, utc+8
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "AST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        if (get){
                            let ASThour = uniHour - 4;
                            let ASTmin = uniMin;
                            let dayChange = 0;
                            if(0 < ASThour && ASThour <= 12){
                                //am
                                if (ASThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [ASThour, ASTmin, dayChange];
                                    }
                                    return message.channel.send(`Atlantic Standard Time (AST) - ${ASThour}:${ASTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [ASThour+12, ASTmin, dayChange];
                                }
                                return message.channel.send(`Atlantic Standard Time (AST) - ${ASThour}:${ASTmin} AM`);
                            }
                            else if (ASThour >= 24){
                                ASThour -= 24;
                                dayChange++;
                                if (ASThour > 12){
                                    //pm
                                    ASThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [ASThour, ASTmin, dayChange];
                                    }
                                    return message.channel.send(`Atlantic Standard Time (AST) - ${ASThour}:${ASTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [ASThour+12, ASTmin, dayChange];
                                }
                                return message.channel.send(`Atlantic Standard Time (AST) - ${ASThour}:${ASTmin} AM`);

                            }
                            else if (ASThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [ASThour, ASTmin, dayChange];
                                }
                                ASThour -= 12;
                                
                                return message.channel.send(`Atlantic Standard Time (AST) - ${ASThour}:${ASTmin} PM`);
                            }
                            else if (ASThour <= 0){
                                ASThour = 24 - Math.abs(ASThour);
                                dayChange--;
                                if (!mentionedRole && !client) {
                                    return [ASThour, ASTmin, dayChange];
                                }
                                return message.channel.send(`Atlantic Standard Time (AST)  -  ${ASThour}:${ASTmin} PM`);
                            }
                        }
                        break;                        
                    case 'CEST':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "CEST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        if(get){
                            let CESThour = uniHour + 2;
                            let CESTmin = uniMin;
                            let dayChange = 0;
                            if(0 < CESThour && CESThour <= 12){
                                //am
                                if (CESThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [CESThour, CESTmin, dayChange];
                                    }
                                    return message.channel.send(`Central European Summer Time (CEST) - ${CESThour}:${CESTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CESThour, CESTmin, dayChange];
                                }
                                return message.channel.send(`Central European Summer Time (CEST) - ${CESThour}:${CESTmin} AM`);
                            }
                            else if (CESThour >= 24){
                                CESThour -= 24;
                                dayChange++;
                                if (CESThour > 12){
                                    //pm
                                    if (!mentionedRole && !client) {
                                        return [CESThour, CESTmin, dayChange];
                                    }
                                    CESThour -= 12;
                                    return message.channel.send(`Central European Summer Time (CEST) - ${CESThour}:${CESTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [CESThour, CESTmin, dayChange];
                                }
                                return message.channel.send(`Central European Summer Time (CEST) - ${CESThour}:${CESTmin} AM`);
                            }
                            else if (CESThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [CESThour, CESTmin, dayChange];
                                }
                                CESThour -= 12;                                
                                return message.channel.send(`Central European Summer Time (CEST) - ${CESThour}:${CESTmin} PM`);
                            }
                        }
                        break;
                    case 'IST':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "IST")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        if(get){
                            let ISThour = uniHour + 5;
                            let ISTmin = uniMin + 30;
                            let dayChange = 0;
                            if (ISTmin >= 60) {
                                ISThour++;
                                ISTmin -= 60;
                            }
                            if(ISThour <= 12){
                                //am
                                if (ISThour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [ISThour, ISTmin, dayChange];
                                    }
                                    return message.channel.send(`India Standard Time (IST) - ${ISThour}:${ISTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [ISThour, ISTmin, dayChange];
                                }
                                return message.channel.send(`India Standard Time (IST) - ${ISThour}:${ISTmin} AM`);
                            }
                            else if (ISThour >= 24){
                                ISThour -= 24;
                                dayChange++;
                                if (ISThour > 12){
                                    //pm
                                    ISThour -= 12;
                                    if (!mentionedRole && !client) {
                                        return [ISThour, ISTmin, dayChange];
                                    }
                                    return message.channel.send(`India Standard Time (IST) - ${ISThour}:${ISTmin} PM`);
                                }
                                if (!mentionedRole && !client) {
                                    return [ISThour, ISTmin, dayChange];
                                }
                                return message.channel.send(`India Standard Time (IST) - ${ISThour}:${ISTmin} AM`);
                            }
                            else if (ISThour > 12){
                                //pm
                                if (!mentionedRole && !client) {
                                    return [ISThour, ISTmin, dayChange];
                                }
                                ISThour -= 12;
                                
                                return message.channel.send(`India Standard Time (IST) - ${ISThour}:${ISTmin} PM`);
                            }
                        }
                        break;
                    case 'UTC':
                        if (set){
                            con.query(`SELECT DISTINCT guildid FROM timezones`, (err, rows) => {
                                if (err){
                                    throw err;
                                }
                                rows.forEach(value => {
                                    if (value.guildid == message.guild.id) {
                                        con.query(`DELETE FROM timezones WHERE guildid = ${message.guild.id}`);
                                    }
                                });

                                con.query(`INSERT INTO timezones(guildid, timezone) VALUES (${message.guild.id}, "UTC")`, (err) => {
                                    if (err){
                                        throw err;
                                    }
                                });
                            });

                        }
                        //Coordinated Universal time, utc+8
                        if(get){
                            let UTChour = uniHour;
                            let UTCmin = uniMin;
                            
                            let dayChange = 0;
                            if(UTChour <= 12){
                                if (UTChour == 12) {
                                    if (!mentionedRole && !client) {
                                        return [UTChour, UTCmin, dayChange];
                                    }
                                    if (uniHour == 0){
                                        uniHour == 12;
                                    }
                                    return message.channel.send(`Coordinated Universal Time (UTC) - ${UTChour}:${UTCmin} PM`);
                                }
                                //am
                                if (!mentionedRole && !client) {
                                    return [UTChour, UTCmin, dayChange];
                                }
                                if (uniHour == 0){
                                    uniHour == 12;
                                }
                                return message.channel.send(`Coordinated Universal Time (UTC) - ${UTChour}:${UTCmin} AM`);
                            }
                            else if (UTChour > 12){
                                //pm
                                UTChour -= 12;
                                if (!mentionedRole && !client) {
                                    return [UTChour, UTCmin, dayChange];
                                }
                                return message.channel.send(`Coordinated Universal Time (UTC) - ${UTChour}:${UTCmin} PM`);
                            }
                        }
                        break;
                    default:
                        message.channel.send(`That's not a valid argument!`);

                }
            }
            else {
                if (!mentionedRole && !client) {
                    return;
                }
                return message.channel.send(usageEmbed);
            }
        }
        else {
            if (!mentionedRole && !client) {
                return;
            }
            return message.channel.send(usageEmbed);
        }
    },
    giveValues(test){
        heehaw(test);
    },
};
const reminder = require('./reminder');
function heehaw(ar) {
    reminder.testexe(ar);
}