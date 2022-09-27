const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Vote to collect rewards!'),

    async execute(client, interaction) {

        try {
            var url = `https://top.gg/api/bots/1014207340188270673/check?userId=${interaction.user.id}`
            fetch(url, { headers: { "Authorization": process.env.voteAuth } })
                .then(res => res.json())
                .then(async data => {

                    if (data.voted === 1) {
                        
                        if (interaction.guild.id === "1016756019952635914" || interaction.guild.id === "1018244995792257114") {
                            var botEmbed = new discord.MessageEmbed()
                                .setTitle(`YOU VOTED`)
                                .setDescription(
                                    `Thank you for voting your reward has been given!`)
                                .setFooter(`${client.user.username} ❤️`)
                                .setTimestamp()
                                .setColor("GREEN")
                            try {
                                interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                var role = interaction.guild.roles.cache.find(role => role.name === "VOTE");
                                if (!role) { return }
                                interaction.member.roles.add(role)
                            } catch (error) { console.log(error) }
                        } else {
                            var botEmbed = new discord.MessageEmbed()
                                .setTitle(`YOU VOTED`)
                                .setDescription(
                                    `Thank you for voting!` +
                                    `\nFor the reward join the [support server](https://discord.gg/8tfdBpUcca)!`)
                                .setFooter(`${client.user.username} ❤️`)
                                .setTimestamp()
                                .setColor("GREEN")
                            interaction.reply({ embeds: [botEmbed], ephemeral: true })
                        }

                    } else {
                        var botEmbed = new discord.MessageEmbed()
                            .setTitle(`VOTE FIRST!`)
                            .setDescription(
                                `You haven't voted!` +
                                `\nClick [here](https://top.gg/bot/1014207340188270673/vote) to vote.`)
                            .setFooter(`${client.user.username} ❤️`)
                            .setTimestamp()
                            .setColor("RED")
                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                    }
                })
        } catch (error) { console.log(error) }
    }
}
