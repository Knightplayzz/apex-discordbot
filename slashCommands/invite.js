const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server!'),

    async execute(client, interaction) {
        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/invite`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `Thank you for inviting ${client.user.username}`+
                `\nClick [here](https://discord.com/api/oauth2/authorize?client_id=1014207340188270673&permissions=8&scope=bot%20applications.commands) to invite.`
                )
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()

        //send the embed
        interaction.reply({ embeds: [botEmbed], ephemeral: true })

    }
}
