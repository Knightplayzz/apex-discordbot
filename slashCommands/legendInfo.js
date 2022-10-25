const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const discord = require("discord.js")

//add a button with link to stats
//change platform to hole name and remove capital letter
//state only only/offline

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selectedlegend')
        .setDescription('Shows selected legend info.')
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

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/legendinfo`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}


        var platform = interaction.options.get('platform').value
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

        var url = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${player}&auth=${process.env.auth}`
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    var url2 = 'https://apex.tracker.gg'
                    try {
                        url2 = `https://apex.tracker.gg/apex/profile/${platform2}/${data.global.name}/overview`
                    } catch { }

                    try {
                        if (data.Error) {
                            var botEmbed = new discord.MessageEmbed()
                                .setTitle(`ERROR`)
                                .setDescription(`${data.Error}`)
                                .setFooter(`${client.user.username} ❤️`)
                                .setTimestamp()
                                .setColor("RED")

                            interaction.reply({ embeds: [botEmbed], ephemeral: true })
                            return
                        }
                    } catch (error) { console.log(error) }
                    const row = new discord.MessageActionRow().addComponents(
                        new discord.MessageButton()
                            .setLabel("Go to Profile")
                            .setURL(url2)
                            .setStyle("LINK"))

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(data.legends.selected.LegendName)
                        .setDescription(
                            `skin: ${data.legends.selected.gameInfo.skin}` +
                            `\nframe: ${data.legends.selected.gameInfo.frame}` +
                            `\npose: ${data.legends.selected.gameInfo.pose}` +
                            `\nIntro: ${data.legends.selected.gameInfo.intro}`
                        )
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setThumbnail(data.legends.selected.ImgAssets.icon)
                    interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true })
                    //console.log(data)


                })
        } catch (error) { console.log(error) }
    }
}