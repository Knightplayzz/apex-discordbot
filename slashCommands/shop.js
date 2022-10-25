const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('View current Apex Legends shop.'),

    async execute(client, interaction) {

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/shop`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `:x: Maintenance :x:`+
                `\nThis will be added very soon.`+
                `\nFor shop [click here](https://apexlegendsstatus.com/store)`
                )
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()
        interaction.reply({ embeds: [botEmbed], ephemeral: true })

    }
}
