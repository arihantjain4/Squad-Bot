const Discord = require('discord.js');
let usageEmbed = new Discord.MessageEmbed();
usageEmbed.setTitle('Usage for Measurements command:');
usageEmbed.setColor('YELLOW');
usageEmbed.addField('Command', '~measurements');
usageEmbed.addField('1st argument','Type of measurement: `us` or `metric` or `UStoMetric` or `MetrictoUS` or `temperature` or `formulas`');

module.exports = {
    name: 'measurements',
    description: 'Displays common measurement conversions (Math)',
    args: true,
    usage: usageEmbed,
    //usage: '<Type of Measurement> (US [Aliases = us,Us], Metric [Aliases = met,Met,metric], MetrictoUS [Aliases = Metrictous,mettous,MetToUs], UstoMetric [Aliases = ustomet,UStoMetric,Ustometric,UstoMet], Temperature [Aliases = temperature,Temp,temp], Forumlas [Aliases = formulas,forms])',
    optional: false,
    execute(message, args, mentionedRole, client, con){
        if (args[0]){
            switch (args[0]){
                case 'us':
                case 'Us':
                case 'US':
                    let EnglishMeasurements = new Discord.MessageEmbed();
                    EnglishMeasurements.setTitle("US Measurements");
                    EnglishMeasurements.addField('Area', '1 square foot (ft²) = 144 square in ches (in²)\n1 square yard (yd²) = 9 square feet\n1 acre (ac) = 43560 square feet\n1 square mile (mi²) = 640 acres');
                    EnglishMeasurements.addField('Volume', '1 cup (c) = 8 fluid ounces (fl. oz.)\n1 pint (pt) = 2 cups\n1 quart (qt) = 2 pints = 4 cups\n1 gallon (gal) = 4 quarts');
                    EnglishMeasurements.addField('Length', '1 foot (ft) = 12 inches (in)\n1 yard (yd) = 3 feet = 36 inches\n1 mile (mi) = 5280 feet = 1760 yards');
                    EnglishMeasurements.addField('Weight', '1 pound (lb) = 16 ounces (oz)\n1 US ton (T) = 1 short ton (T) = 2000 pounds');
                    message.channel.send(EnglishMeasurements);
                    break;
                case 'met':
                case 'Met':
                case 'Metric':
                case 'metric':
                    let MetricMeasurements = new Discord.MessageEmbed();
                    MetricMeasurements.setTitle("Metric Measurements");
                    MetricMeasurements.addField('Area', '1 sq centimeter (cm²) = 100 sq millimeters (mm²)\n1 sq meter (m²) = 10000 sq centimeters\n1 hectare (ha) = 10000 square meters\n1 sq kilometer (km²) = 1000000 sq meters');
                    MetricMeasurements.addField('Volume', '1 millimeter (ml) = 0.001 liter (L)\n1 centiliter = 0.01 liter\n1 deciliter (dl) = 0.1 liter\n1 dekaliter = 10 liters\n1 hectoliter = 100 liters\n1 kiloliter = 1000 liters');
                    MetricMeasurements.addField('Length', '1 millimeter = 0.001 meter\n 1 centimeter = 0.001 meter\n1decimeter (dm) = 0.1 meter\n1dekameter (dam) = 10 meters\n1hectometer (hm) = 100 meters\n1 kilometer = 1000 meters');
                    MetricMeasurements.addField('Mass/Weight', '1 milligram (mg) = 0.001 gram (g)\n1 centigram (cg) = 0.01 gram\n1 decigram (dg) = 0.1 gram\n1 dekagram (dag) = 10 grams\n1 hectogram (hg) = 100 grams\n1 kilogram = 1000 grams\n1 metric ton (t) = 1000 kilograms');
                    message.channel.send(MetricMeasurements);
                    break;
                case 'MetrictoUS':
                case 'Metrictous':
                case 'mettous':
                case 'MetToUs':
                    let MetricToUS = new Discord.MessageEmbed();
                    MetricToUS.setTitle("Metric to US Conversions (approximate)");
                    MetricToUS.addField('Area', 'cm² x 0.16 = in²\nm² x 10.76 = ft²\nkm² x 0.39 = mi²\nhectares x 2.47 = acre');
                    MetricToUS.addField('Length', 'cm x 0.39 = in\nm x 3.28 = ft\nm x 1.09 = y\nkm x 0.62 = mi');
                    MetricToUS.addField('Mass & Weight', 'grams (g) x 0.035 = ounces (oz)\nkg x 2.20 = lb\nmetric ton (t) x 1.10 = US ton (T)\nnewtons (n) x 0.023 = lbs [force]');
                    MetricToUS.addField('Volume', 'cm³ x 0.06 = in³\nm³ x 35.3 = ft³\nL x 1.06 = qt\nL x 0.26 = gal');
                    message.channel.send(MetricToUS);
                    break;
                case 'Ustometric':
                case 'ustomet':
                case 'UStoMetric':
                case 'UstoMet':
                    let UsToMetric = new Discord.MessageEmbed();
                    UsToMetric.setTitle("US to Metric Conversions (approximate)");
                    UsToMetric.addField('Area', 'in² x 6.45 = cm²\nft² x 0.09 = m²\nmi² x 2.59 = km²\nacres x 0.40 = hectares');
                    UsToMetric.addField('Length', 'in x 2.54 = cm\nft x 0.30 = m\ny x 0.91 = m\nmi x 1.61 = km');
                    UsToMetric.addField('Mass & Weight', 'oz x 28.35 = g\nlbs x 0.45 = kg\nt x 0.91 = T\nlb force x 4.45 = n');
                    UsToMetric.addField('Volume', 'in³ x 16.39 = cm³\nft³ x 0.03 = m³\nqt x 0.95 = L\ngal x 3.79 = L');
                    message.channel.send(UsToMetric);
                    break;
                case 'Temperature':
                case 'temperature':
                case 'Temp':
                case 'temp':
                    let Temp = new Discord.MessageEmbed();
                    Temp.setTitle("Temperature Conversions");
                    Temp.addField('Celcius to Fahrenheit', 'F = C x (9/5) + 32');
                    Temp.addField('Fahrenheit to Celcius', 'C = (5/9)(F - 32)');
                    Temp.addField('Celcius to Kelvin', 'K = C + 273.15');
                    Temp.addField('Fahrenheit to Kelvin', 'K = (5/9)(F - 32) + 273.15');
                    message.channel.send(Temp);
                    break;
                case 'Formulas':
                case 'formulas':
                case 'forms':
                    let Formulas = new Discord.MessageEmbed();
                    Formulas.setTitle("Common Formulas");
                    Formulas.addField('Rectangle perimeter', 'P = 2(l+w)');
                    Formulas.addField('Square perimeter', 'P = 4s');
                    Formulas.addField('Regular polygon perimeter', 'P = s x number of sides');
                    Formulas.addField('Rectangle area', 'A = lw');
                    Formulas.addField('Square area', 's²');
                    Formulas.addField('Parellelogram area', 'A = bh');
                    Formulas.addField('Triangle area', 'A = (bh)/2');
                    Formulas.addField('Trapezoid area', 'A = (h x (B1 + B2))/2');
                    Formulas.addField('Circle area', 'A = πr²');
                    Formulas.addField('Circle circumference', 'C = πd = 2πr');
                    Formulas.addField('Rectangular prism volume', 'V = lwh');
                    Formulas.addField('Prism volume', 'V = h x base area');
                    Formulas.addField('Cylinder volume', 'V = πr²h');
                    Formulas.addField('Pyramid volume', 'V = (h x base area)/3');
                    Formulas.addField('Cone volume', '(πr²h)/3');
                    Formulas.addField('Cylinder surface area', 'SA = 2πr² + 2πrh');
                    Formulas.addField('Sphere volume', '(4πr³)/3');
                    Formulas.addField('Sphere surface area', '4πr²');
                    Formulas.addField('Simple interest', 'I = principal x rate x time');
                    Formulas.addField('Distance', 'd = rate x time');
                    message.channel.send(Formulas);
                    break;
                default:
                    message.channel.send(`That's not a valid argument!`);

            }
        }

    }
};