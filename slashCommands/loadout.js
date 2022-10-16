const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loadout')
        .setDescription('Picks a random loadout to use in-game.'),

    async execute(client, interaction) {

        var weapons = [
            { name: "Flatline", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/f/f1/VK-47_Flatline.png/revision/latest?cb=20220511040308" },
            { name: "Havoc", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/e/ec/HAVOC_Rifle.png/revision/latest?cb=20220616154439" },
            { name: "R-301", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/f/f1/R-301_Carbine.png/revision/latest?cb=20220604191827" },
            { name: "Hemlok", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/7/74/Hemlok_Burst_AR.png/revision/latest?cb=20220617000007" },
            { name: "Alternator", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/e/e9/Alternator_SMG.png/revision/latest?cb=20220513124637" },
            { name: "Prowler", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/b/bf/Prowler_Burst_PDW.png/revision/latest?cb=20220829140000" },
            { name: "R-99", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/d/d5/R-99_SMG.png/revision/latest?cb=20220829171808" },
            { name: "Volt", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/6/60/Volt_SMG.png/revision/latest?cb=20210717062422" },
            { name: "CAR", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/1/13/C.A.R._SMG.png/revision/latest?cb=20211104170312" },
            { name: "Devotion", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/8/8c/Devotion_LMG.png/revision/latest?cb=20220917210303" },
            { name: "L-STAR", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/0/01/L-STAR_EMG.png/revision/latest?cb=20220915044251" },
            { name: "Spitfire", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/f/f2/M600_Spitfire.png/revision/latest?cb=20220919090724" },
            { name: "G7 Scout", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/e/eb/G7_Scout.png/revision/latest?cb=20220830141535" },
            { name: "Triple Take", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/d/d9/Triple_Take.png/revision/latest?cb=20210823030642" },
            { name: "30-30 Repeater", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/8/86/30-30_Repeater.png/revision/latest?cb=20220911173300" },
            { name: "Charge Rifle", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/2b/Charge_Rifle.png/revision/latest?cb=20221009165709" },
            { name: "Longbow", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/4/46/Longbow_DMR.png/revision/latest?cb=20220906141950" },
            { name: "Sentinel", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/9/91/Sentinel.png/revision/latest?cb=20220515012656" },
            { name: "EVA-8", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/9/97/EVA-8_Auto.png/revision/latest?cb=20210817041450" },
            { name: "Mozambique", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/a/ae/Mozambique_Shotgun.png/revision/latest?cb=20210813094328" },
            { name: "Peacekeeper", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/6/64/Peacekeeper.png/revision/latest?cb=20210814095843" },
            { name: "RE-45", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/25/RE-45_Auto.png/revision/latest?cb=20210816090119" },
            { name: "P2020", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/c/c1/P2020.png/revision/latest?cb=20210815055000" },
            { name: "Wingman", url: "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/0/09/Wingman.png/revision/latest?cb=20210813090820" }
        ]
        let length = weapons.length
        let y = Math.floor(Math.random() * (length))
        let x = Math.floor(Math.random() * (length))
        if(x === y){
            if(x === 0){x++}
            if(x === length){x--}
        }

        let value1 = x.toString()
        let value2 = y.toString()

        const options = [
            {
                label: weapons[x].name,
                value: value1
            },
            {
                label: weapons[y].name,
                value: value2
            }
        ]
        const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                    .setCustomId("loadout")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(options)
            )

    

        var botEmbed = new discord.MessageEmbed()
            .setDescription(`Use **${weapons[x].name}** this round!`)
            .setImage(weapons[x].url)
            .setFooter(`${client.user.username} ❤️`)
            .setTimestamp()

        interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true })
    }
}
