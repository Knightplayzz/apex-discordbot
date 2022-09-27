const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot Commands'),

    async execute(client, interaction) {
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `:video_game: **Bot Commands:**`+
                "\n``/help`` - Bot Commands."+
                "\n``/map`` - Current and next BR map."+
                "\n``/arena`` - Current and next arena map."+
                "\n``/rankedarena`` - Current and next ranked arena map."+
                "\n``/status`` - EA server status."+
                "\n``/crafting`` - Current crafting cycle."+

                "\n\n:game_die: Fun:"+
                "\n``/who [type]`` - Picks a random legend to play in-game."+

                "\n\n:pencil: Apex Statistics:"+
                "\n``/stats [platform] [username]`` - Shows Apex statistics."+
                "\n``/pred`` - Shows how many points you need to reach Apex Predator."+
                "\n``/link`` - Link your Discord account to your Apex Legends username."+
                "\n``/unlink`` - Unlink your Discord account from your Apex username."+
                "\n``/me`` - Shows your own stats if an account has been linked."+

                "\n\n:shield: Support Server: [click](https://discord.gg/cgdssWTqAT)"+
                "\n:thumbsup: Donations: [click](https://donorbox.org/apex-bot)"

                )
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()


        //send the embed
        interaction.reply({ embeds: [botEmbed], ephemeral: true })

    }
}
