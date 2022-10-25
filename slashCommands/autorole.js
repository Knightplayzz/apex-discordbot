const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v9')
const discord = require("discord.js")
const firebase = require('firebase/app')
const { getFirestore, collection, doc, setDoc, getDoc, deleteDoc } = require('firebase/firestore')
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
        .setName('autorole')
        .setDescription('Gives a role with the apex rank of the user.')
        //.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption(option =>
            option.setName('autorole')
                .setDescription('Enable or Disable autorole.')
                .setRequired(true)
                .addChoices(
                    { name: 'enable', value: 'enable' },
                    { name: 'disable', value: 'disable' },
                    { name: 'current', value: 'selected' }
                )),


    async execute(client, interaction) {

        try{
            //log
            const logServ = client.guilds.cache.get('1018244995792257114')
            const logChan = logServ.channels.cache.find(channel => channel.name === "log")
            logChan.send({ content: "``/autorole`` - " + interaction.user.username + "#" + interaction.user.discriminator })
        }catch{console.log('logchan not found')}


        if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) { return interaction.reply({ content: "The bot doesn't have the permission to do this! \n Invite the bot again by pressing [here](https://discord.com/api/oauth2/authorize?client_id=1014207340188270673&permissions=8&scope=bot%20applications.commands)" }) }
        var onOrOff = interaction.options.get('autorole').value
        var on = false
        var selected = false
        if (onOrOff === 'enable') { on = true }
        if (onOrOff === 'disable') { on = false }
        if (onOrOff === 'selected') { selected = true }

        const docRef2 = doc(db, 'servers', interaction.member.guild.id)
        const docSnap = await getDoc(docRef2)

        if (docSnap.exists()) {
            if (on === false && selected === false) {
                deleteDoc(docRef2).then(() => {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${client.user.username} :heart: `)
                        .setDescription(`Changed to: disabled`)
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setColor("GREEN")
                    return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                })
            }
            if (on === true) {
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Changed to: enabled`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setColor("GREEN")
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
            if (selected === true) {
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Currently: enabled`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setColor("GREEN")
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }



        } else {



            if (on === false && selected === false) {
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Changed to: disabled`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setColor("GREEN")
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
            if (on === true) {
                const citiesRef = collection(db, "servers");
                await setDoc(doc(citiesRef, interaction.member.guild.id), { on: true }).then(() => {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${client.user.username} :heart: `)
                        .setDescription(`Changed to: enabled`)
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setColor("GREEN")
                    return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                });
            }
            if (selected === true) {
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Currently: disabled`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setColor("GREEN")
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            }
        }




    }
}
