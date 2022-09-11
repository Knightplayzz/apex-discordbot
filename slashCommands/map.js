const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Shows the current in-game map.'),

    async execute(client, interaction) {
        var url = `https://api.mozambiquehe.re/maprotation?auth=${process.env.auth}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                try {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${data.current.map} -> ${data.next.map}`)
                        .setDescription(
                            ":green_circle: **Current map:**\n" +
                            "Map: ``" + data.current.map + " [" + data.current.DurationInMinutes + "]``\n" +
                            "Remaining: ``" + data.current.remainingMins + " min``\n" +
                            "Start: <t:" + data.current.start + ":t>\n" +
                            "End: <t:" + data.current.end + ":t>\n ㅤ\n" +

                            ":yellow_circle: **Next Map:**\n" +
                            "Map: ``" + data.next.map + " [" + data.next.DurationInMinutes + "]``\n" +
                            "Start: <t:" + data.next.start + ":t>\n" +
                            "End: <t:" + data.next.end + ":t>")
                        .setFooter(`${client.user.username} ❤️`)
                        .setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/1691649584310810232/923CA93F05B9AE7D6DEA595AE41563B2713DBD41/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true')
                        .setTimestamp()
                        .setImage(data.current.asset)
                        .setColor('ORANGE')

                    interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch (error) { console.log(error) }
            })
    }
}
