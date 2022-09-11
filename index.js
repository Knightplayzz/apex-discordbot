const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const botConfig = require("./botConfig");
const discord = require("discord.js")
const fs = require("fs");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES]
});

client.slashCommands = new Collection();
const slashCommands = [];
var messageString = ""



//slash commands
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const commandSlashFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const fileSlash of commandSlashFiles) {
    const commandSlash = require(`./slashCommands/${fileSlash}`);

    client.slashCommands.set(commandSlash.data.name, commandSlash);
    slashCommands.push(commandSlash.data.toJSON());
    console.log(`File Loaded | ${fileSlash}.js`);
};

//presence
client.once("ready", async message => {
    console.log(`${client.user.username} is online.`);
    var url = `https://api.mozambiquehe.re/maprotation?auth=${botConfig.auth}`
    setInterval(function () {
        try{
        fetch(url)
            .then(res => res.json())
            .then(data => {
                try{
                    client.user.setActivity(`${data.current.map} [${data.current.remainingMins}min]`, {
                        type: "PLAYING"
                    });
                }catch(error){ return console.log(error)}
                
            })
        }catch(error){console.log(error)}
    }, 20 * 1000)
});
client.on("messageCreate", message => {
    if (message.author.bot) { return }
    messageString = message.content
    messageString = messageString.toLocaleLowerCase()
    if (!messageString.startsWith("!")) { return }
    messageString = messageString.replace("!", "")
    var guildNames = []
    var guildNames2 = ''
    if (messageString === 'serveramount') {
        client.guilds.cache.forEach(g => {
            guildNames.push(g.name)
            guildNames2 = guildNames.join(', ')
            guildNames2 = guildNames2.replace(/, /g, '\n')
        })
       
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(guildNames2)
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()



        message.channel.send({ embeds: [botEmbed] })
    }
})



// slash commands

const rest = new REST({ version: '10' }).setToken(botConfig.token);

// rest.delete(Routes.applicationGuildCommand(botConfig.clientID, botConfig.serverID, '1018120098092953642'))
//     .then(() => console.log('Successfully deleted guild command'))
//     .catch(console.error);

// rest.delete(Routes.applicationCommand(botConfig.clientID, '1015197769645961256'))
//     .then(() => console.log('Successfully deleted application command'))
//     .catch(console.error);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(botConfig.clientID),
            { body: slashCommands }
        )
        console.log('succesfully reloaded application (/) commands.');
    } catch (error) {
        console.log(error)
    }
})()
//interact
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return;
        try {
            await slashCommand.execute(client, interaction);
        } catch (err) {
            var errorEmbed = new discord.MessageEmbed()
                .setTitle(":x:ERROR:x:")
                .setDescription("Something went horribly wrong!")
                .setColor("RED")
                .setFooter(`© created by philippe#0354`)

            await interaction.reply({ embeds: [errorEmbed] })
            console.log(err)
        }
    }
})
client.login(botConfig.token);