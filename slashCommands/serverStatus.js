const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Shows current in-game server status.')
        .addStringOption(option =>
            option.setName('region')
                .setDescription('Wich region?')
                .setRequired(true)
                .addChoices(
                    { name: 'EU-West', value: 'EU-West' },
                    { name: 'EU-East', value: 'EU-East' },
                    { name: 'US-West', value: 'US-West' },
                    { name: 'US-Central', value: 'US-Central' },
                    { name: 'US-East', value: 'US-East' },
                    { name: 'SouthAmerica', value: 'SouthAmerica' },
                    { name: 'Asia', value: 'Asia' }
                )),

    async execute(client, interaction) {
        var url = `https://api.mozambiquehe.re/servers?auth=${process.env.auth}`
        var region = interaction.options.get('region').value

        fetch(url)
            .then(res => res.json())
            .then(data => {
                try {
                    var titleText = ''
                    var embedColor = 'RED'
                    if (data.Origin_login[region].Status === 'UP' && data.EA_novafusion[region].Status === 'UP' && data.EA_accounts[region].Status === 'UP' && data.ApexOauth_Crossplay[region].Status === 'UP') {
                        titleText = 'All systems Online'
                        embedColor = 'GREEN'
                    } else {
                        if (data.Origin_login[region].Status === 'DOWN' || data.EA_novafusion[region].Status === 'DOWN' || data.EA_accounts[region].Status === 'DOWN' || data.ApexOauth_Crossplay[region].Status === 'DOWN') {
                            embedColor = 'RED'
                            titleText = 'SERVER DOWN'
                        } else {
                            if (data.Origin_login[region].Status === 'SLOW' || data.EA_novafusion[region].Status === 'SLOW' || data.EA_accounts[region].Status === 'SLOW' || data.ApexOauth_Crossplay[region].Status === 'SLOW') {
                                embedColor = 'ORANGE'
                                titleText = 'SLOW SERVER'
                            }
                        }
                    }
                    var originLogin = ''
                    var ApexServers = ''
                    var EA_accounts = ''
                    var ApexCrossplay = ''

                    if (data.Origin_login[region].Status === 'UP') { originLogin = ':green_circle:' } else { if (data.Origin_login[region].Status === 'SLOW') { originLogin = ':yellow_circle:' } else { if (data.Origin_login[region].Status === 'DOWN') { originLogin = ':red_circle:' } } }
                    if (data.EA_novafusion[region].Status === 'UP') { ApexServers = ':green_circle:' } else { if (data.EA_novafusion[region].Status === 'SLOW') { ApexServers = ':yellow_circle:' } else { if (data.EA_novafusion[region].Status === 'DOWN') { ApexServers = ':red_circle:' } } }
                    if (data.EA_accounts[region].Status === 'UP') { EA_accounts = ':green_circle:' } else { if (data.EA_accounts[region].Status === 'SLOW') { EA_accounts = ':yellow_circle:' } else { if (data.EA_accounts[region].Status === 'DOWN') { EA_accounts = ':red_circle:' } } }
                    if (data.ApexOauth_Crossplay[region].Status === 'UP') { ApexCrossplay = ':green_circle:' } else { if (data.ApexOauth_Crossplay[region].Status === 'SLOW') { ApexCrossplay = ':yellow_circle:' } else { if (data.ApexOauth_Crossplay[region].Status === 'DOWN') { ApexCrossplay = ':red_circle:' } } }

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(titleText)
                        .setDescription(
                            `${originLogin} Origin login` +
                            `\n${ApexServers} Apex Servers` +
                            `\n${EA_accounts} EA Accounts` +
                            `\n${ApexCrossplay} Apex Crossplay`)

                        .setColor(embedColor)
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()

                    interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch (error) { console.log(error) }
            })
    }
}
