const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const firebase = require('firebase/app')
const { getFirestore, doc, getDoc } = require('firebase/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyBJ12J-Q0HGEH115drMeCRKsPd_kt-Z68A",
    authDomain: "apex-discordbot.firebaseapp.com",
    databaseURL: "https://apex-discordbot-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "apex-discordbot",
    storageBucket: "apex-discordbot.appspot.com",
    messagingSenderId: "985625049043",
    appId: "1:985625049043:web:0401c7b6c4ceea7e516126",
    measurementId: "G-JSY0XDKC14"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app)


module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription('Shows your own stats if an account has been linked.'),

    async execute(client, interaction) {

        const docRef2 = doc(db, 'serverUsers',interaction.guild.id, 'users',interaction.user.id)
        const docSnap = await getDoc(docRef2)

        if (docSnap.exists()) {
            const docData = docSnap.data()
            var platform2 = ''
            var platform3 = ''


            if (docData.platform === 'PC') {
                platform2 = 'origin'
                platform3 = 'Origin'
            }
            if (docData.platform === 'PS4') {
                platform2 = 'psn'
                platform3 = 'Playstation'
            }
            if (docData.platform === 'X1') {
                platform2 = 'xbl'
                platform3 = 'Xbox'
            }
            var url = `https://api.mozambiquehe.re/bridge?version=5&platform=${docData.platform}&player=${docData.username}&auth=${process.env.auth}`
            fetch(url)
                .then(res => res.json())
                .then(data => {

                    var url2 = 'https://apex.tracker.gg'
                    try {
                        url2 = `https://apex.tracker.gg/apex/profile/${platform2}/${data.global.name}/overview`
                    } catch { }

                    try {
                        if (data.Error) {
                            var botEmbed = new discord.MessageEmbed()
                                .setTitle(`ERROR`)
                                .setDescription(`${data.Error}`)
                                .setFooter(`${client.user.username} ❤️`)
                                .setTimestamp()
                                .setColor("RED")


                            //send the embed
                            interaction.reply({ embeds: [botEmbed], ephemeral: true })
                            return
                        }
                    } catch (error) { console.log(error) }

                    var kd = data.total.kd.value
                    if (kd === '-1') { kd = '-' }
                    var kills = '-'
                    var damage = '-'
                    var headshot = '-'
                    var gamesPlayed = '-'

                    try { damage = data.total.damage.value } catch { }
                    try { headshot = data.total.headshots.value } catch { }
                    try { gamesPlayed = data.total.games_played.value } catch { }
                    try { kills = data.total.kills.value } catch { }


                    var isInGame = ''
                    if (data.realtime.isInGame === 0) { isInGame = 'no' }
                    if (data.realtime.isInGame === 1) { isInGame = 'yes' }

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${data.global.name}`)
                        .setThumbnail(data.global.rank.rankImg)
                        .setFooter(`--------------------------------------------------------------` +
                            `\nKills(K/D): ${kills} (${kd})` +
                            `\nHeadshots: ${headshot}` +
                            `\nDamage: ${damage}` +
                            `\nGames played: ${gamesPlayed}`)
                        .addFields(
                            { name: `:arrow_forward: Apex Ranked:`, value: `Rank: ${data.global.rank.rankName} ${data.global.rank.rankDiv} \nScore: ${data.global.rank.rankScore}`, inline: true },
                            { name: `:arrow_forward: Arena Ranked:`, value: `Rank: ${data.global.arena.rankName} ${data.global.arena.rankDiv} \nScore: ${data.global.arena.rankScore}`, inline: true })

                        .setColor('ORANGE')
                        .setDescription(
                            `Level: ${data.global.level} [${data.global.levelPrestige}]` +
                            `\nPlatform: ${platform3}` +
                            //`\n-> Prestige: ${data.global.bages.levelPrestige}`
                            `\nIn a game: ${isInGame} ` +
                            `\n----------------------------------------------------`
                            //is online
                        );
                    const row = new discord.MessageActionRow().addComponents(
                        new discord.MessageButton()
                            .setLabel("Go to Profile")
                            .setURL(url2)
                            .setStyle("LINK"))

                    interaction.reply({ embeds: [botEmbed], components: [row], ephemeral: true })
                })

        } else {

            var botEmbed = new discord.MessageEmbed()
                .setTitle(`ERROR`)
                .setDescription(`You are not linked!`)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
                .setColor("RED")

            interaction.reply({ embeds: [botEmbed], ephemeral: true })
        }

    }
}
