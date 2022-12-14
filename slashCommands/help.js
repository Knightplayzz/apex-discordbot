const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot Commands'),

    async execute(client, interaction) {

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/help`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle(`${client.user.username} :heart: `)
            .setDescription(
                `:video_game: **Bot Commands:**`+
                "\n``/help`` - Bot Commands."+
                "\n``/vote`` - Vote for the bot and receive a reward."+
                "\n``/invite`` - Invite the bot to your server!"+
                "\n``/map`` - Current and next BR map."+
                "\n``/arena`` - Current and next arena map."+
                "\n``/rankedarena`` - Current and next ranked arena map."+
                "\n``/status`` - EA server status."+
                "\n``/crafting`` - Current crafting cycle."+
                "\n``/selectedlegend`` - Shows current selected legend of a player."+

                "\n\n:game_die: Fun:"+
                "\n``/who`` - Picks a random legend to play in-game."+
                "\n``/team`` - Pick a random team to play in-game."+
                "\n``/drop`` - Random place to drop."+
                "\n``/loadout`` - Pick a random loadout to use in-game."+
                "\n``/heirloom`` - Shows current heirlooms."+
                "\n``/autorole`` - Gives a role with the apex rank of the user."+
                "\n``/autorole-refresh`` - Manually refresh your rank role."+

                "\n\n:pencil: Apex Statistics:"+
                "\n``/stats`` - Shows Apex statistics."+
                "\n``/distribution`` - Shows the rank distribution."+
                "\n``/predator`` - Amount of points for Apex Predator."+
                "\n``/link`` - Link your account to your Apex username."+
                "\n``/unlink`` - Unlink your account from your Apex username."+
                "\n``/me`` - Shows your own stats if an account has been linked."+
                "\n``/leaderboard`` - Shows leaderboard."+

                `\n\n:shield: Support Server: [click](${process.env.discordInvite})`+
                "\n:thumbsup: Donations: [click](https://donorbox.org/apex-bot)"

                )
            .setFooter(`${client.user.username} ??????`)
            .setTimestamp()

        //send the embed
        interaction.reply({ embeds: [botEmbed], ephemeral: true })

    }
}
