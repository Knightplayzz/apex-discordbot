const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v9')
const discord = require("discord.js")
const firebase = require('firebase/app')
const { getFirestore, collection, doc, setDoc, getDoc } = require('firebase/firestore')
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

        var onOrOff = interaction.options.get('autorole').value
        var on = false
        var selected = false
        if (onOrOff === 'enable') { on = true }
        if (onOrOff === 'disable') { on = false }
        if (onOrOff === 'selected') { selected = true }

        const docRef2 = doc(db, 'servers', interaction.member.guild.id)
        const docSnap = await getDoc(docRef2)
        if (docSnap.exists()) {
            const docData = docSnap.data()
            if (selected === true) {
                var x = "off"
                if (docData.on === true) { x = "on" }
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Currently: ${x}`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })
            } else {
                var x = "off"
                if (onOrOff === 'enable') { x = "on" }
                const citiesRef = collection(db, "servers");
                await setDoc(doc(citiesRef, interaction.member.guild.id), { on: on });
                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`${client.user.username} :heart: `)
                    .setDescription(`Changed to: ${x}`)
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                return interaction.reply({ embeds: [botEmbed], ephemeral: true })

            }
        } else {
            var x = "off"
            if (onOrOff === 'enable') { x = "on" }

            var botEmbed = new discord.MessageEmbed()
                .setTitle(`${client.user.username} :heart: `)
                .setDescription(`Changed to: ${x}`)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
            interaction.reply({ embeds: [botEmbed], ephemeral: true })

            const citiesRef = collection(db, "servers");
            await setDoc(doc(citiesRef, interaction.member.guild.id), { on: on });
        }

    }
}
