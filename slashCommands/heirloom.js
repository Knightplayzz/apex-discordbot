const { SlashCommandBuilder} = require('@discordjs/builders');
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('heirloom')
        .setDescription('Shows current heirlooms.'),

    async execute(client, interaction) {

        const options = [
            {
                label: "Loba",
                value: "1"
            },
            {
                label: "Valkyrie",
                value: "2"
            },
            {
                label: "Crypto",
                value: "3"
            },
            {
                label: "Wattson",
                value: "4"
            },
            {
                label: "Rampart",
                value: "5"
            },
            {
                label: "Revenant",
                value: "6"
            },
            {
                label: "Bangalore",
                value: "7"
            },
            {
                label: "Gibraltar",
                value: "8"
            },
            {
                label: "Caustic",
                value: "9"
            },
            {
                label: "Mirage",
                value: "10"
            },
            {
                label: "Octane",
                value: "11"
            },
            {
                label: "Pathfinder",
                value: "12"
            },
            {
                label: "Lifeline",
                value: "13"
            },
            {
                label: "Bloodhound",
                value: "14"
            },
            {
                label: "Wraith",
                value: "15"
            },
        ]

        const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                    .setCustomId("heirlooms")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(options)
            )
    
            var botEmbed = new discord.MessageEmbed()
            .setTitle("Select a legend:")
            .setFooter(`${client.user.username} ❤️`)
            .setImage(``)
            .setTimestamp()

        await interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true });

    }
}
