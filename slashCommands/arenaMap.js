const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('arena')
        .setDescription('Shows the current in-game arena map.'),

    async execute(client, interaction) {
        const botConfig = require('../botConfig.json')
        var url = `https://api.mozambiquehe.re/maprotation?auth=${botConfig.auth}&version=2`

        fetch(url)
            .then(res => res.json())
            .then(data => {

                try {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${data.arenas.current.map} -> ${data.arenas.next.map}`)
                        .setDescription(
                            ":green_circle: **Current Arena map:**\n" +
                            "Map: ``" + data.arenas.current.map + " [" + data.arenas.current.DurationInMinutes + "]``\n" +
                            "Remaining: ``" + data.arenas.current.remainingMins + " min``\n" +
                            "Start: <t:" + data.arenas.current.start + ":t>\n" +
                            "End: <t:" + data.arenas.current.end + ":t>\n ㅤ\n" +

                            ":yellow_circle: **Next Arena Map:**\n" +
                            "Map: ``" + data.arenas.next.map + " [" + data.arenas.next.DurationInMinutes + "]``\n" +
                            "Start: <t:" + data.arenas.next.start + ":t>\n" +
                            "End: <t:" + data.arenas.next.end + ":t>")
                        .setFooter(`${client.user.username} ❤️`)
                        .setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/1691649584310810232/923CA93F05B9AE7D6DEA595AE41563B2713DBD41/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true')
                        .setTimestamp()
                        .setImage(data.arenas.current.asset)
                        .setColor('ORANGE')


                    interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch (error) { console.log(error) }
            })
    }
}
