const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const botConfig = require('../botConfig.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('View current Apex Legends shop.'),

    async execute(client, interaction) {
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `:x: Maintenace :x:`+
                `\nThis will be added verry soon.`+
                `\nFor shop [click here](https://apexlegendsstatus.com/store)`
                )
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()
        interaction.reply({ embeds: [botEmbed], ephemeral: true })

    }
}
