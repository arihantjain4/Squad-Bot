module.exports = {
    name: 'jgfyyyqrufr78',
    description: 'Reminder for reminding and storing eventsd=j.',
    args: true,
    optional: true,
    execute(message, args, mentionedRole, client, con, guild_id, arrrray){
        if (!guild_id && ! arrrray) {
            return;
        }
        let hourminute = [];
        let reminderArray;
        //console.log(guild_id);
        try {
            con.query(`SELECT * FROM timezones WHERE guildid = ${guild_id}`, (err, rows) => {
                let timezone = "";
                if (err) {
                    throw err;
                }
                if (rows.length == 0) {
                    timezone = "UTC";
                }
                //console.log(rows);
                timezone = rows[0].timezone;
                let arrrray2 = arrrray;
                arrrray2[1] = timezone;
                //console.log(arrrray2);
                hourminute = time.execute(message, arrrray2, null, null, null);
                //console.log('%c' + hourminute, 'color: green;');
                //console.log(timezone);
                reminderArray = new Array(hourminute[0], hourminute[1], hourminute[2], timezone);
                //time.giveValues(reminderArray);
                e_test4(reminderArray);
            });
        } catch (error) {
            console.error(error);
        }
        
        
    },
}
const time = require('./time');
function e_test4(ar) {
    time.giveValues(ar);
}