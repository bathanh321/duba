const{ readdirSync } = require('fs');
const { join } = require('path');
const ascii = require('ascii-table');

let table = new ascii('Command');
table.setHeading("File Name", "Status");

module.exports = (client) =>{

    const commandPath = join(__dirname, '..', 'commands'); 
    readdirSync(commandPath).forEach((dir) => {
        const commands = readdirSync(join(commandPath, dir)).filter((file) => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(join(commandPath, dir, file));
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❎ -> lack of help.name`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}