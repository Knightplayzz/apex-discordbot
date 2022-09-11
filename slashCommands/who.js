const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Picks a random legend to play in-game.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Category of legends to choose from.')
                .setRequired(false)
                .addChoices(
                    { name: 'Offensive', value: 'Offensive' },
                    { name: 'Defensive', value: 'Defensive' },
                    { name: 'Support', value: 'Support' },
                    { name: 'Recon', value: 'Recon' }
                )),

    async execute(client, interaction) {

        try {
            var type = interaction.options.get('type').value
            var Offensive = ["Ash", "Bangalore", "Fuse", "Horizon", "Mad Maggie", "Mirage", "Octane", "Revenant", "Wraith"]
            var Offensive_link = [
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Ash.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bangalore.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Fuse.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Horizon.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mad%20Maggie.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mirage.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Octane.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Revenant.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wraith.png',

            ]
            var Defensive = ["Caustic", "Gibraltar", "Newcastle", "Wattson"]
            var Defensive_link = [
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Caustic.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Gibraltar.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Newcastle.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wattson.png'
            ]
            var Support = ["Lifeline", "Loba"]
            var Support_link = [
                "https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Lifeline.png",
                "https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Loba.png"
            ]
            var Recon = ["Bloodhound", "Crypto", "Pathfinder", "Seer", "Valkyrie", "Vantage"]
            var Recon_link = [
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bloodhound.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Crypto.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Pathfinder.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Seer.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Valkyrie.png',
                'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Vantage.png'
            ]

            if (type === "Offensive") {
                let y = Offensive.length - 1
                let x = Math.floor(Math.random() * (y - 0))
                let botEmbed = new discord.MessageEmbed()
                    .setDescription(`Play **${Offensive[x]}** this round!`)
                    .setImage(Offensive_link[x])
                    .setImage(Support_link[x])
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()

                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
            if (type === "Defensive") {
                let y = Defensive.length - 1
                let x = Math.floor(Math.random() * (y - 0))
                let botEmbed = new discord.MessageEmbed()
                    .setDescription(`Play **${Defensive[x]}** this round!`)
                    .setImage(Defensive_link[x])
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()

                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
            if (type === "Support") {
                let y = Support.length - 1
                let x = Math.floor(Math.random() * (y - 0))
                let botEmbed = new discord.MessageEmbed()
                    .setDescription(`Play **${Support[x]}** this round!`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()

                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
            if (type === "Recon") {
                let y = Recon.length - 1
                let x = Math.floor(Math.random() * (y - 0))
                let botEmbed = new discord.MessageEmbed()
                    .setDescription(`Play **${Recon[x]}** this round!`)
                    .setImage(Recon_link[x])
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()

                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }



        } catch { }



        var legends = ['Ash', 'Bangalore', 'Bloodhound', 'Caustic', 'Crypto', 'Fuse', 'Gibraltar', 'Horizon', 'Lifeline', 'Loba', 'Mad Maggie', 'Mirage', 'Newcastle', 'Octane', 'Pathfinder', 'Rampart', 'Revenant', 'Seer', 'Valkyrie', 'Vantage', 'Wraith', 'Wattson']
        var legendLink = [
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Ash.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bangalore.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bloodhound.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Caustic.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Crypto.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Fuse.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Gibraltar.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Horizon.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Lifeline.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Loba.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mad%20Maggie.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mirage.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Newcastle.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Octane.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Pathfinder.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Rampart.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Revenant.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Seer.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Valkyrie.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Vantage.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wraith.png',
            'https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wattson.png'
        ]
        var y = legends.length - 1

        var x = Math.floor(Math.random() * (y - 0))

        var botEmbed = new discord.MessageEmbed()
            .setDescription(`Play **${legends[x]}** this round!`)
            .setImage(legendLink[x])
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()

        interaction.reply({ embeds: [botEmbed], ephemeral: true })


        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Ash.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bangalore.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Bloodhound.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Caustic.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Crypto.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Fuse.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Gibraltar.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Horizon.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Lifeline.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Loba.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mad%20Maggie.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Mirage.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Newcastle.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Octane.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Pathfinder.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Rampart.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Revenant.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Seer.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Valkyrie.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wattson.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Wraith.png
        // https://cdn.jumpmaster.xyz/Bot/Legends/Banners/Vantage.png
    }
}
