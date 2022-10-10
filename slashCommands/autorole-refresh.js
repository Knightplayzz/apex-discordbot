const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v9')
const discord = require("discord.js")
const fetch = require('node-fetch')
const firebase = require('firebase/app')
const { getFirestore, collection, getDoc, query, doc } = require('firebase/firestore')
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
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole-refresh')
        .setDescription('Mannually resh your rank role.')
        //.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(client, interaction) {
        const docRef2 = doc(db, 'servers', interaction.guild.id)
        const docSnap = await getDoc(docRef2)

        if (docSnap.exists()) {
            if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) { return interaction.reply({ content: "The bot doesn't have the permission to do this! \n Invite the bot again by pressing [here](https://discord.com/api/oauth2/authorize?client_id=1014207340188270673&permissions=8&scope=bot%20applications.commands)" }) } else {
                var rolePred = interaction.guild.roles.cache.find(role => role.name === "Predator");
                var roleMasters = interaction.guild.roles.cache.find(role => role.name === "Masters");
                var roleDiamond = interaction.guild.roles.cache.find(role => role.name === "Diamond");
                var rolePlatinum = interaction.guild.roles.cache.find(role => role.name === "Platinum");
                var roleGold = interaction.guild.roles.cache.find(role => role.name === "Gold");
                var roleSilver = interaction.guild.roles.cache.find(role => role.name === "Silver");
                var roleBronze = interaction.guild.roles.cache.find(role => role.name === "Bronze");

                if (!rolePred) { await interaction.guild.roles.create({ name: "Predator", color: "RED", hoist: true, position: 1 }) }
                if (!roleMasters) { await interaction.guild.roles.create({ name: "Masters", color: "PURPLE", hoist: true, position: 1 }) }
                if (!roleDiamond) { await interaction.guild.roles.create({ name: "Diamond", color: "DARKBLUE", hoist: true, position: 1 }) }
                if (!rolePlatinum) { await interaction.guild.roles.create({ name: "Platinum", color: "BLUE", hoist: true, position: 1 }) }
                if (!roleGold) { await interaction.guild.roles.create({ name: "Gold", color: "YELLOW", hoist: true, position: 1 }) }
                if (!roleSilver) { await interaction.guild.roles.create({ name: "Silver", color: "GREY", hoist: true, position: 1 }) }
                if (!roleBronze) { await interaction.guild.roles.create({ name: "Bronze", color: "#9b5f3d", hoist: true, position: 1 }) }

                var rolePred = interaction.guild.roles.cache.find(role => role.name === "Predator");
                var roleMasters = interaction.guild.roles.cache.find(role => role.name === "Masters");
                var roleDiamond = interaction.guild.roles.cache.find(role => role.name === "Diamond");
                var rolePlatinum = interaction.guild.roles.cache.find(role => role.name === "Platinum");
                var roleGold = interaction.guild.roles.cache.find(role => role.name === "Gold");
                var roleSilver = interaction.guild.roles.cache.find(role => role.name === "Silver");
                var roleBronze = interaction.guild.roles.cache.find(role => role.name === "Bronze");

                var clientPos = interaction.guild.roles.cache.find(role => role.name === "Apex")
                if (clientPos.position < rolePred.position || clientPos.position < roleMasters.position || clientPos.position < roleDiamond.position || clientPos.position < rolePlatinum.position || clientPos.position < roleGold.position || clientPos.position < roleSilver.position || clientPos.position < roleBronze.position) {
                    console.log("Can't acces role in guild" + x.name)
                    return interaction.reply({ content: "The Apex Bot role must be higher that the ranked roles!" })
                } else {
                    const docRef2 = doc(db, 'users', interaction.user.id)
                    const docSnap = await getDoc(docRef2)

                    if (docSnap.exists()) {
                        let data = docSnap.data()
                        let url = `https://api.mozambiquehe.re/bridge?version=5&platform=${data.platform}&player=${data.username}&auth=${process.env.auth}`
                        fetch(url)
                            .then(res => res.json())
                            .then(async data => {
                                if (!data.global) { return }
                                if (data.error) { return }
                                if (data.Error) { return }

                                let z = interaction.member
                                if (data.global.rank.rankName === "Predator") {
                                    if (z.roles.cache.has(rolePred.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(roleMasters.id)) { z.roles.remove(roleMasters) }
                                        z.roles.add(rolePred)
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Predator rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    }
                                }
                                if (data.global.rank.rankName === "Masters") {
                                    if (z.roles.cache.has(roleMasters.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(rolePred.id)) { z.roles.remove(rolePred) }
                                        if (z.roles.cache.has(roleDiamond.id)) { z.roles.remove(roleDiamond) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Masters rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")
                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(roleMasters)
                                    }
                                }
                                if (data.global.rank.rankName === "Diamond") {
                                    if (z.roles.cache.has(roleDiamond.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(roleMasters.id)) { z.roles.remove(roleMasters) }
                                        if (z.roles.cache.has(rolePlatinum.id)) { z.roles.remove(rolePlatinum) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Diamond rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(roleDiamond)
                                    }
                                }
                                if (data.global.rank.rankName === "Platinum") {
                                    if (z.roles.cache.has(rolePlatinum.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(roleDiamond.id)) { z.roles.remove(roleDiamond.id) }
                                        if (z.roles.cache.has(roleGold.id)) { z.roles.remove(roleGold) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Platium rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(rolePlatinum)
                                    }
                                }
                                if (data.global.rank.rankName === "Gold") {
                                    if (z.roles.cache.has(roleGold.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(rolePlatinum.id)) { z.roles.remove(rolePlatinum) }
                                        if (z.roles.cache.has(roleSilver.id)) { z.roles.remove(roleSilver) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Gold rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(roleGold)
                                    }
                                }
                                if (data.global.rank.rankName === "Silver") {
                                    if (z.roles.cache.has(roleSilver.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(roleGold.id)) { z.roles.remove(roleGold) }
                                        if (z.roles.cache.has(roleBronze.id)) { z.roles.remove(roleBronze) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Silver rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(roleSilver)
                                    }
                                }
                                if (data.global.rank.rankName === "Bronze") {
                                    if (z.roles.cache.has(roleBronze.id)) {
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`ERROR`)
                                            .setDescription(`You already have this rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("RED")
                                        return interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                    } else {
                                        if (z.roles.cache.has(roleSilver.id)) { z.roles.remove(roleSilver) }
                                        var botEmbed = new discord.MessageEmbed()
                                            .setTitle(`SUCCES`)
                                            .setDescription(`You now have the Bronze rank!`)
                                            .setFooter(`${client.user.username} ❤️`)
                                            .setTimestamp()
                                            .setColor("GREEN")

                                        interaction.reply({ embeds: [botEmbed], ephemeral: true })
                                        z.roles.add(roleBronze)
                                    }
                                }
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
        } else { return interaction.reply({ content: "This feature is off in this server!" }) }

    }
}
