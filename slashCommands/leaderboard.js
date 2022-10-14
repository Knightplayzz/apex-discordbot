
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Shows the current in-game map.'),

    async execute(client, interaction) {
        var url = `https://api.mozambiquehe.re/leaderboard?auth=${process.env.auth}&legend=ANY&key=Global&platform=}`
        //direct clickable link to "https://apexlegendsstatus.com" with the following text: "Data provided by Apex Legends Status"
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `:x: Maintenace :x:`+
                `\nThis will be added very soon.`+
                `\nFor learderboard [click here](https://apexlegendsstatus.com/leaderboard/Global/rankScore/1)`
                )
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()

            interaction.reply({ embeds: [botEmbed], ephemeral: true })

        fetch(url)
            .then(res => res.json())
            .then(data => {
                
            })
    }
}
