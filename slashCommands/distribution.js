const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const discord = require("discord.js")
const fetch = require('node-fetch')
const Canvas = require('canvas')
const canvas = Canvas.createCanvas(1200, 800)
const ctx = canvas.getContext('2d')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('distribution')
        .setDescription('Shows the rank distribution.'),

    async execute(client, interaction) {
        try {
            const url = "https://apexlegendsstatus.com/lib/php/rankdistrib.php?unranked=yes";
            fetch(url)
                .then(res => res.json())
                .then(async data => {
                    const distData = data

                    const distribEmbed = new discord.MessageEmbed()
                        .setTitle("Rank Distribution")
                        .setDescription("Data from https://apexlegendsstatus.com\nThis data is from all the user that exist in the ALS database.");

                    const allCount = () => {
                        let count = 0;
                        for (let i = 1; i < distData.length; i++) {
                            count += Number(distData[i].totalCount);
                        }
                        return count;
                    };

                    for (let i = 1; i < distData.length; i++) {
                        distribEmbed.addFields({
                            name: distData[i].name,
                            value: `${"```ansi\n\u001b[0;33m"}${((Number(distData[i].totalCount) / allCount() * 100).toFixed(2)).toString()}\u001b[0;37m%${"```"}`,
                            inline: true,
                        });
                    }

                    const rookie = distData[1].totalCount
                    const bronze = distData[2].totalCount + distData[3].totalCount + distData[4].totalCount + distData[5].totalCount
                    const silver = distData[6].totalCount + distData[7].totalCount + distData[8].totalCount + distData[9].totalCount
                    const gold = distData[10].totalCount + distData[11].totalCount + distData[12].totalCount + distData[13].totalCount
                    const plat = distData[14].totalCount + distData[15].totalCount + distData[16].totalCount + distData[17].totalCount
                    const dia = distData[18].totalCount + distData[19].totalCount + distData[20].totalCount + distData[21].totalCount
                    const masters = distData[22].totalCount
                    const pred = distData[23].totalCount

                    let x = 1500

                    const diff_rookie = rookie / allCount() * x
                    const diff_bronze = bronze / allCount() * x
                    const diff_silver = silver / allCount() * x
                    const diff_gold = gold / allCount() * x
                    const diff_plat = plat / allCount() * x
                    const diff_dia = dia / allCount() * x
                    const diff_master = masters / allCount() * x
                    const diff_pred = pred / allCount() * x

                    ctx.fillStyle = distData[1].color;
                    ctx.fillRect(20, 750, 100, -diff_rookie);

                    ctx.fillStyle = distData[2].color;
                    ctx.fillRect(170, 750, 100, -diff_bronze);

                    ctx.fillStyle = distData[6].color;
                    ctx.fillRect(320, 750, 100, -diff_silver);

                    ctx.fillStyle = distData[10].color;
                    ctx.fillRect(470, 750, 100, -diff_gold);

                    ctx.fillStyle = distData[14].color;
                    ctx.fillRect(620, 750, 100, -diff_plat);

                    ctx.fillStyle = distData[18].color;
                    ctx.fillRect(770, 750, 100, -diff_dia);

                    ctx.fillStyle = distData[22].color;
                    ctx.fillRect(920, 750, 100, -diff_master);

                    ctx.fillStyle = distData[23].color;
                    ctx.fillRect(1070, 750, 100, -diff_pred);

                    var attachment = new MessageAttachment(canvas.toBuffer(), 'hello.png')
                    distribEmbed.setImage(`attachment://${attachment.name}`)

                    await interaction.reply({ embeds: [distribEmbed], files: [attachment], ephemeral: true })


                })
        }
        catch (error) { }
    }
}
