const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions, MessageAttachment } = require("discord.js");
const discord = require("discord.js")



module.exports = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Pick a random team to play in-game.'),

    async execute(client, interaction) {
        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/team`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}

        const array = [
            { name: "Ash", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-ash.png.adapt.crop16x9.png" },
            { name: "Bangalore", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-bangalore.png.adapt.crop16x9.png" },
            { name: "Bloodhound", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-bloodhound.png.adapt.crop16x9.png" },
            { name: "Caustic", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-caustic.png.adapt.crop16x9.png" },
            { name: "Crypto", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-crypto.png.adapt.crop16x9.png" },
            { name: "Fuse", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/01/apex-grid-tile-legends-fuse.png.adapt.crop16x9.png" },
            { name: "Gibraltar", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-gibraltar.png.adapt.crop16x9.png" },
            { name: "Horizon", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/10/horizon/apex-grid-tile-legends-horizon.png.adapt.crop16x9.png" },
            { name: "Lifeline", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-lifeline.png.adapt.crop16x9.png" },
            { name: "Loba", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/05/apex-grid-tile-legends-loba.png.adapt.crop16x9.png" },
            { name: "Mad Maggie", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2022/01/apex-grid-tile-legends-maggie.png.adapt.crop16x9.png" },
            { name: "Mirage", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-mirage.png.adapt.crop16x9.png" },
            { name: "Newcastle", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2022/05/apex-grid-tile-legends-newcastle.png.adapt.crop16x9.png" },
            { name: "Octane", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-octane.png.adapt.crop16x9.png" },
            { name: "Pathfinder", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-pathfinder.png.adapt.crop16x9.png" },
            { name: "Rampart", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/08/rampart/apex-grid-tile-legends-rampart.png.adapt.crop16x9.png" },
            { name: "Revenant", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/02/apex-legend-revenant-grid-tile.png.adapt.crop16x9.png" },
            { name: "Seer", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/07/seer-assets/apex-grid-tile-legends-seer.png.adapt.crop16x9.png" },
            { name: "Valkyrie", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/04/apex-grid-tile-legends-valkyrie.png.adapt.crop16x9.png" },
            { name: "Vantage", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2022/07/apex-grid-tile-legends-vantage.png.adapt.crop16x9.png" },
            { name: "Wattson", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-wattson.png.adapt.crop16x9.png" },
            { name: "Wraith", url: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-wraith.png.adapt.crop16x9.png" },
        ]
        var y = array.length
        var x = Math.floor(Math.random() * (y))
        var z = Math.floor(Math.random() * (y))
        var q = Math.floor(Math.random() * (y))

        if (x === z || x === q) {
            if (x === 0) { return x++ }
            if (x === y) { return x-- }
            x++
        }
        if (x === z || x === q) {
            if (x === y) { return x - 2 }
            x++
        }

        const Canvas = require('canvas')

        const canvas = Canvas.createCanvas(1200, 500)
        const ctx = canvas.getContext('2d')

        //daily
        const daily1 = await Canvas.loadImage(
            array[x].url
        )
        var daily_x_1 = -100
        var daily_y_1 = -100
        ctx.drawImage(daily1, daily_x_1, daily_y_1)

        const daily2 = await Canvas.loadImage(
            array[z].url
        )
        var daily_x_2 = 330
        var daily_y_2 = -100
        ctx.drawImage(daily2, daily_x_2, daily_y_2)



        //weekly
        const weekly1 = await Canvas.loadImage(
            array[q].url
        )
        w_x1 = 760
        w_y1 = -100
        ctx.drawImage(weekly1, w_x1, w_y1)



        var attachment = new MessageAttachment(canvas.toBuffer(), 'hello.png')

        var botEmbed = new discord.MessageEmbed()
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()
            .setImage(`attachment://${attachment.name}`)


        return interaction.reply({ embeds: [botEmbed], files: [attachment], ephemeral: true })


    }
}
