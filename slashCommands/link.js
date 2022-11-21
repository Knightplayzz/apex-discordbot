const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const firebase = require('firebase/app')
const { getFirestore, collection, doc, setDoc, getDocs, query, getDoc } = require('firebase/firestore')
const firebaseConfig = {
   //secret
};
//secret

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app)


module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your Discord account to your Apex Legends username.')
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('The platform you play Apex on.')
                .setRequired(true)
                .addChoices(
                    { name: 'origin', value: 'Origin' },
                    { name: 'playstation', value: 'Playstation' },
                    { name: 'xbox', value: 'Xbox' },
                ))

        .addStringOption(option =>
            option.setName('username')
                .setDescription('Your in-game username.')
                .setRequired(true)
        ),


    async execute(client, interaction) {

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/link`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}

        var platform = interaction.options.get('platform').value
        var platform2 = ''

        if (platform === 'Origin') {
            platform = 'PC'
            platform2 = 'origin'
        }
        if (platform === 'Playstation') {
            platform = 'PS4'
            platform2 = 'psn'
        }
        if (platform === 'Xbox') {
            platform = 'X1'
            platform2 = 'xbl'
        }

        const player = interaction.options.getString('username')

        const docRef2 = doc(db, 'serverUsers', interaction.guild.id, 'users', interaction.user.id)

        const docSnap = await getDoc(docRef2)
        if (docSnap.exists()) {
            const data = docSnap.data()
            var botEmbed = new discord.MessageEmbed()
                .setTitle(`ERROR`)
                .setDescription(
                    `You are already linked to:` +
                    `\n**${data.username}** [${data.platform}]`)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
                .setColor("RED")

            return interaction.reply({ embeds: [botEmbed], ephemeral: true })
        } else {

            var url = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${player}&auth=${process.env.auth}`
            url.replace(/ /g, '')
            try {
                fetch(url)
                    .then(res => res.json())
                    .then(async data => {

                        var url2 = 'https://apex.tracker.gg'
                        try {
                            url2 = url2 = `https://apex.tracker.gg/apex/profile/${platform2}/${data.global.name}/overview`
                            url2.replace(/ /g, '')
                        } catch { }

                        try {
                            if (data.Error) {
                                var botEmbed = new discord.MessageEmbed()
                                    .setTitle(`ERROR`)
                                    .setDescription(`${data.Error}`)
                                    .setFooter(`${client.user.username} ❤️`)
                                    .setTimestamp()
                                    .setColor("RED")

                                interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                return
                            }
                        } catch (error) { console.log(error) }
                        //const citiesRef = collection(db, "users");
                        const citiesRef = collection(db, 'serverUsers', interaction.guild.id, 'users')

                        await setDoc(doc(citiesRef, interaction.user.id), {
                            platform: platform,
                            username: data.global.name
                        });
                        var botEmbed = new discord.MessageEmbed()
                            .setTitle(`SUCCES`)
                            .setDescription(`You are now linked to:` +
                                `\n**${data.global.name}** [${platform}]`)
                            .setFooter(`${client.user.username} ❤️`)
                            .setTimestamp()
                            .setColor("GREEN")


                        //send the embed
                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                    })
            } catch (error) { console.log(error) }
        }


    }
}
