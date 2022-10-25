const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('heirloom')
        .setDescription('heirloom list')
        .addStringOption(option =>
            option.setName('legend')
                .setDescription('Select.')
                .setRequired(false)
                .addChoices(
                    { name: 'Loba', value: '1' },
                    { name: 'Valkyrie', value: '2' },
                    { name: 'Crypto', value: '3' },
                    { name: 'Wattson', value: '4' },
                    { name: 'Rampart', value: '5' },
                    { name: 'Revenant', value: '6' },
                    { name: 'Bangalore', value: '7' },
                    { name: 'Gibraltar', value: '8' },
                    { name: 'Caustic', value: '9' },
                    { name: 'Mirage', value: '10' },
                    { name: 'Octane', value: '11' },
                    { name: 'Pathfinder', value: '12' },
                    { name: 'Lifeline', value: '13' },
                    { name: 'Bloodhound', value: '14' },
                    { name: 'Wraith', value: '15' }
                )),

    async execute(client, interaction) {

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/heirloom`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}

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


        try {
            var legend = interaction.options.get('legend').value
            let x = Number(legend)
            x--

            const nameArray = [
                { name: "Loba", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/15112334/Loba-heirloom-1536x864.jpeg" },
                { name: "Valkyrie", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133636/Valkyrie-heirloom-1536x865.jpeg" },
                { name: "Crypto", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133723/Crypto-heirloom-1536x864.jpeg" },
                { name: "Wattson", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133630/Wattson-heirloom-1536x865.jpeg" },
                { name: "Rampart", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133644/Rampart-heirloom-1536x865.jpeg" },
                { name: "Revenant", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133640/Revenant-heirloom-1536x865.jpeg" },
                { name: "Bangalore", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14132411/Bangalore-heirloom-1536x864.jpeg" },
                { name: "Gibraltar", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133716/Gibraltar-heirloom-1536x864.jpeg" },
                { name: "Caustic", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133729/Caustic-heirloom-1536x864.jpeg" },
                { name: "Mirage", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133703/Mirage-heirloom-1536x864.jpeg" },
                { name: "Octane", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133657/Octane-heirloom-1536x865.jpeg" },
                { name: "Pathfinder", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133651/Pathfinder-heirloom-1536x864.jpeg" },
                { name: "Lifeline", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133710/Lifeline-heirloom-1536x864.jpeg" },
                { name: "Bloodhound", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133737/Bloodhound-heirloom-1536x864.jpeg" },
                { name: "Waith", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133622/Wraith-heirloom-1536x865.jpeg" },
            ]

            var botEmbed = new discord.MessageEmbed()
                .setTitle(nameArray[x].name)
                .setFooter(`${client.user.username} ❤️`)
                .setImage(nameArray[x].url)
                .setTimestamp()

            return interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true });
            
        } catch { }

        var botEmbed = new discord.MessageEmbed()
            .setTitle("Select a legend:")
            .setFooter(`${client.user.username} ❤️`)
            .setImage(``)
            .setTimestamp()

        await interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true });

    }
}
