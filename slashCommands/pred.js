const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('predator')
        .setDescription('See how many points you need to reach Apex Predator on each platform.'),


    async execute(client, interaction) {
        var url = `https://api.mozambiquehe.re/predator?auth=${process.env.auth}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                try {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle("Points to reach Apex Predator?")
                        .setAuthor({ name: 'Click to view charts', iconURL: client.user.avatarURL(), url: 'https://apexlegendsstatus.com/points-for-predator?utm_source=discord&utm_campaign=predator_cmd' })
                        .setDescription(
                            `<:ApexPredator:1016755465276882965> **Battle Royale**` +
                            `\n${data.RP.PC.val} RP on PC <:origin:1016774254307573780>` +
                            `\n${data.RP.PS4.val} RP on Playstation <:playstation:1016763405484437554>` +
                            `\n${data.RP.X1.val} RP on Xbox <:xbox:1016776466354147339>` +
                            `\n${data.RP.SWITCH.val} RP on Switch <:switch:1016763447234531418>` +

                            `\n\n<:ApexPredator:1016755465276882965> **Arenas**` +
                            `\n${data.AP.PC.val} AP on PC <:origin:1016774254307573780>` +
                            `\n${data.AP.PS4.val} AP on Playstation <:playstation:1016763405484437554>` +
                            `\n${data.AP.X1.val} AP on Xbox <:xbox:1016776466354147339>` +
                            `\n${data.AP.SWITCH.val} AP on Switch <:switch:1016763447234531418>`
                        )
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setColor("#5e0000")
                        .setThumbnail('https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/4/43/Ranked_Tier7_Apex_Predator.png/revision/latest?cb=20190902181417')

                    interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch (error) { console.log(error) }
            })
    }
}
