const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const firebase = require('firebase/app')
const { getFirestore, collection, doc, getDoc, deleteDoc } = require('firebase/firestore')
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
        .setName('unlink')
        .setDescription('Unlink your Discord account from your Apex username.'),

    async execute(client, interaction) {
        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/unlink`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}

        const docRef2 = doc(db, 'serverUsers', interaction.guild.id, 'users', interaction.user.id)
        const docSnap = await getDoc(docRef2)
        if (docSnap.exists()) {
            const docData = docSnap.data()

            deleteDoc(docRef2).then(() => {
                var botEmbed = new discord.MessageEmbed()
                .setTitle(`SUCCES`)
                .setDescription(
                   `You are now unlinked from`+
                   `\n**${docData.username}** [${docData.platform}]`)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
                .setColor("RED")

            interaction.reply({ embeds: [botEmbed], ephemeral: true })
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
