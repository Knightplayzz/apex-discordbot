const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rankedarena')
        .setDescription('Shows the current in-game ranked arena map.'),

    async execute(client, interaction) {
        const botConfig = require('../botConfig.json')
        var url = `https://api.mozambiquehe.re/maprotation?auth=${botConfig.auth}&version=2`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                try {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${data.arenasRanked.current.map} -> ${data.arenasRanked.next.map}`)
                        .setDescription(
                            ":green_circle: **Current Arena map:**\n" +
                            "Map: ``" + data.arenasRanked.current.map + " [" + data.arenasRanked.current.DurationInMinutes + "]``\n" +
                            "Remaining: ``" + data.arenasRanked.current.remainingMins + " min``\n" +
                            "Start: <t:" + data.arenasRanked.current.start + ":t>\n" +
                            "End: <t:" + data.arenasRanked.current.end + ":t>\n ㅤ\n" +

                            ":yellow_circle: **Next Arena Map:**\n" +
                            "Map: ``" + data.arenasRanked.next.map + " [" + data.arenasRanked.next.DurationInMinutes + "]``\n" +
                            "Start: <t:" + data.arenasRanked.next.start + ":t>\n" +
                            "End: <t:" + data.arenasRanked.next.end + ":t>")
                        .setFooter(`${client.user.username} ❤️`)
                        .setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/1691649584310810232/923CA93F05B9AE7D6DEA595AE41563B2713DBD41/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true')
                        .setTimestamp()
                        .setImage(data.arenasRanked.current.asset)
                        .setColor('ORANGE')
                        
                    interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch (error) { console.log(error) }
            })
    }
}
