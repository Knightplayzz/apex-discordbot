const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const { error } = require('console');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crafting')
        .setDescription('Show current items that can be crafted at the replicator!'),

    async execute(client, interaction) {
        try{
        var url = `https://api.mozambiquehe.re/crafting?auth=${process.env.auth}` 
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(async data => {

                const path = require('path')
                const Canvas = require('canvas')

                const canvas = Canvas.createCanvas(400, 400)
                const ctx = canvas.getContext('2d')

                //daily
                const daily1 = await Canvas.loadImage(
                    data[0].bundleContent[0].itemType.asset
                )
                var daily_x_1 = 200
                var daily_y_1 = 0
                ctx.drawImage(daily1, daily_x_1, daily_y_1)

                const daily2 = await Canvas.loadImage(
                    data[0].bundleContent[1].itemType.asset
                )
                var daily_x_2 = 0
                var daily_y_2 = 0
                ctx.drawImage(daily2, daily_x_2, daily_y_2)



                //weekly
                const weekly1 = await Canvas.loadImage(
                    data[1].bundleContent[0].itemType.asset
                )
                w_x1 = 0
                w_y1 = 200
                ctx.drawImage(weekly1, w_x1, w_y1)

                const weekly2 = await Canvas.loadImage(
                    data[1].bundleContent[1].itemType.asset
                )
                w_x2 = 200
                w_y2 = 200
                ctx.drawImage(weekly2, w_x2, w_y2)

              //  var attachment = new MessageAttachment(canvas.toBuffer(), 'hello.png')
              var attachment = new MessageAttachment(canvas.toBuffer(), 'hello.png')
                
                var botEmbed = new discord.MessageEmbed()
                    .setTitle("Crafting Cycle")
                    .setDescription(
                        `<t:${data[0].end}:R>`+
                        `\n<t:${data[1].end}:R>`
                    )
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setImage(`attachment://${attachment.name}`)


                return interaction.reply({ embeds: [botEmbed], files: [attachment], ephemeral: true })

            })
         } catch{console.log("PROBLEM")}
    }
}
