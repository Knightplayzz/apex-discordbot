const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require("discord.js");
const discord = require("discord.js")
const fetch = require('node-fetch')
const botConfig = require('../botConfig.json')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('drop')
        .setDescription('Random place to drop.')
        .addStringOption(option =>
            option.setName('map')
                .setDescription('Select what map.')
                .setRequired(false)
                .addChoices(
                    { name: 'Storm Point', value: "Storm Point" },
                    { name: "Wold's Edge", value: "World's Edge" },
                    { name: "Kings Canyon", value: "Kings Canyon" },
                    { name: "Olympus", value: "Olympus" },
                )
        ),
    async execute(client, interaction) {
        var url = `https://api.mozambiquehe.re/maprotation?auth=${process.env.auth}`
        fetch(url)
            .then(res => res.json())
            .then(async data => {
                const map = {
                    "Storm Point": [
                        { name: "Antenna", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/antenna.jpg" },
                        { name: "Barometer", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/barometer.jpg" },
                        { name: "Cascade Falls", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/cascade-falls.jpg" },
                        { name: "Cenote", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/cenote.jpg" },
                        { name: "Checkpoint", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/checkpoint.jpg" },
                        { name: "Command Center", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/command-center.jpg" },
                        { name: "Highpoint", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/highpoint.jpg" },
                        { name: "Lightning Rod", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/lightning-rod.jpg" },
                        { name: "Mill", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/mill.jpg" },
                        { name: "Northpad", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/northpad.jpg" },
                        { name: "Shipfall", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/shipfall.jpg" },
                        { name: "Storm Catcher", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/stormPoint/storm-catcher.jpg" }
                    ],
                    "World's Edge": [
                        { name: "Climatizer", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/climatizer.jpg" },
                        { name: "Count", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/count.jpg" },
                        { name: "Lava Fissure", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/fissure-crossing.jpg" },
                        { name: "Fragment", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/fragment.jpg" },
                        { name: "Geyser", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/geyser.jpg" },
                        { name: "Harverster", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/harvester.png" },
                        { name: "Launch site", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/launch-site.jpg" },
                        { name: "Lava Siphon", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/lava-siphon.png" },
                        { name: "Rampart Area", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/rampart-area.jpg" },
                        { name: "Skyhook", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/skyhook.jpg" },
                        { name: "Staging", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/staging.jpg" },
                        { name: "The dome", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/the-dome.jpg" },
                        { name: "Thermal Station", url: "https://www.cs.csubak.edu/~caleman/apex/apexDrop/worldsEdge/thermal-station.jpg" }
                    ],
                    "olympus": [
                        { name: "Rift", url: "https://www.dexerto.com/_next/image/?url=https%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2021%2F02%2F10%2Fapex-blog-image-olympus-map-05-rift-bubble.jpg.adapt_.1456w.jpg&w=1920&q=75" },
                        { name: "Bonsai Plaze", url: "https://www.dexerto.com/_next/image/?url=https%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2021%2F02%2F10%2Fapex-legends-9-olympus-14-esportimes.jpg&w=1920&q=75" },
                        { name: "Orbital Cannon Test Site", url: "https://www.dexerto.com/_next/image/?url=https%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fapex-blog-image-olympus-map-03-cannon.jpg.adapt_.1456w.jpg&w=1920&q=75" },
                        { name: "Grow Towers", url: "https://www.dexerto.com/_next/image/?url=https%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fgrow-towers-apex.jpg&w=828&q=75" },
                        { name: "Hammond Labs", url: "https://i.redd.it/utphnwqq19w51.jpg" },
                        { name: "UNKOWN DATA", url: "https://media.contentapi.ea.com/content/dam/apex-legends/common/articles/defiance-olympuas-map-update/apex-legends-screenshots-s12-map-sabotagedolympus-b-clean-min.png.adapt.crop16x9.1455w.png" }
                    ],
                    "Kings Canyon": [
                        { name: "", url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/apex-legends/f/fb/Screenshot_%2820%29.png?width=1024" },
                        { name: "Containment", url: "https://i.playground.ru/p/X0CpTSovSjdSqS3tqnw2og.webp" },
                        { name: "The cage", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/03/Kings-Canyon.jpg" },
                        { name: "Crash Site", url: "https://www.gamelivestory.com/images/article/why-kings-canyon-is-the-worst-apex-legends-map-for-ranked-play-main.webp" },
                        { name: "", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/05/Kings-Canyon-Overlooking-Salvage-in-Apex-Legends-Season-5.jpg" },
                        { name: "", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/05/Kings-Canyon-Overlooking-Capacitor-and-Rig-in-Apex-Legends-Season-5.jpg" },
                    ]
                }
                try {
                    let legend = interaction.options.get('map').value
                    let y = map[legend].length
                    var x = Math.floor(Math.random() * (y))

                    var botEmbed = new discord.MessageEmbed()
                        .setDescription(`Drop in **${map[legend][x].name}** this round!`)
                        .setImage(map[legend][x].url)
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()

                    return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                } catch { }

                let y = map[data.current.map].length
                let z = Math.floor(Math.random() * y)

                var botEmbed = new discord.MessageEmbed()
                    .setDescription(`Drop **${map[data.current.map][z].name}** this round!`)
                    .setImage(map[data.current.map][z].url)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()

                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            })
    }
}
