const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const discord = require("discord.js")

//add a button with link to stats
//change platform to hole name and remove capital letter
//state only only/offline

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows legends stats, account and rank info, and online status.')
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('The platform you play Apex on.')
                .setRequired(true)
                .addChoices(
                    { name: 'origin', value: 'Origin' },
                    { name: 'playstation', value: 'Playstation' },
                    { name: 'xbox', value: 'Xbox' },
                ))

        .addStringOption(option =>
            option.setName('username')
                .setDescription('Your in-game username.')
                .setRequired(true)
        ),


    async execute(client, interaction) {

        var platform = interaction.options.get('platform').value
        var platform3 = interaction.options.get('platform').value
        var platform2 = ''

        if (platform === 'Origin') {
            platform = 'PC'
            platform2 = 'origin'
        }
        if (platform === 'Playstation') {
            platform = 'PS4'
            platform2 = 'psn'
        }
        if (platform === 'Xbox') {
            platform = 'X1'
            platform2 = 'xbl'
        }
        const player = interaction.options.getString('username')
        try {
            var url = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${player}&auth=${process.env.auth}`
            url.replace(/ /g, '')

            fetch(url)
                .then(res => res.json())
                .then(data => {

                    var url2 = 'https://apex.tracker.gg'
                    try {
                        url2 = `https://apex.tracker.gg/apex/profile/${platform2}/${data.global.name}/overview`
                        url2 = url2.replace(/ /g, '')
                    } catch { }

                    try {
                        if (data.Error) {
                            var botEmbed = new discord.MessageEmbed()
                                .setTitle(`ERROR`)
                                .setDescription(`${data.Error}`)
                                .setFooter(`${client.user.username} ❤️`)
                                .setTimestamp()
                                .setColor("RED")


                            //send the embed
                            interaction.reply({ embeds: [botEmbed], ephemeral: true })
                            return
                        }
                    } catch (error) { console.log(error) }

                    var kd = data.total.kd.value
                    if (kd === '-1') { kd = '-' }
                    var kills = '-'
                    var damage = '-'
                    var headshot = '-'
                    var gamesPlayed = '-'

                    try { damage = data.total.damage.value } catch { }
                    try { headshot = data.total.headshots.value } catch { }
                    try { gamesPlayed = data.total.games_played.value } catch { }
                    try { kills = data.total.kills.value } catch { }


                    var isInGame = ''
                    if (data.realtime.isInGame === 0) { isInGame = 'no' }
                    if (data.realtime.isInGame === 1) { isInGame = 'yes' }

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${data.global.name}`)
                        .setThumbnail(data.global.rank.rankImg)
                        .setFooter(`--------------------------------------------------------------` +
                            `\nKills(K/D): ${kills} (${kd})` +
                            `\nHeadshots: ${headshot}` +
                            `\nDamage: ${damage}` +
                            `\nGames played: ${gamesPlayed}`)
                        .addFields(
                            { name: `:arrow_forward: Apex Ranked:`, value: `Rank: ${data.global.rank.rankName} ${data.global.rank.rankDiv} \nScore: ${data.global.rank.rankScore}`, inline: true },
                            { name: `:arrow_forward: Arena Ranked:`, value: `Rank: ${data.global.arena.rankName} ${data.global.arena.rankDiv} \nScore: ${data.global.arena.rankScore}`, inline: true })

                        .setColor('ORANGE')
                        .setDescription(
                            `Level: ${data.global.level} [${data.global.levelPrestige}]` +
                            `\nPlatform: ${platform3}` +
                            `\nIn a game: ${isInGame} ` +
                            `\n----------------------------------------------------`
                            //is online
                        );
                    const row = new discord.MessageActionRow().addComponents(
                        new discord.MessageButton()
                            .setLabel("Go to Profile")
                            .setURL(url2)
                            .setStyle("LINK"))

                    interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true })
                })
        } catch (error) {
            interaction.reply({ content: "ERROR try again later." })
            console.log(error)
        }
    }
}