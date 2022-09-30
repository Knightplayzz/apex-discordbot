const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const fs = require("fs");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES]
});

client.slashCommands = new Collection();
const slashCommands = [];
var messageString = ""



//slash commands
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const commandSlashFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const fileSlash of commandSlashFiles) {
    const commandSlash = require(`./slashCommands/${fileSlash}`);

    client.slashCommands.set(commandSlash.data.name, commandSlash);
    slashCommands.push(commandSlash.data.toJSON());
    console.log(`File Loaded | ${fileSlash}.js`);
};

//presence
client.once("ready", async message => {
    console.log(`${client.user.username} is online.`);
    var url = `https://api.mozambiquehe.re/maprotation?auth=${process.env.auth}`
    setInterval(function () {
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    try {
                        client.user.setActivity(`${data.current.map} [${data.current.remainingMins}min]`, {
                            type: "PLAYING"
                        });
                    } catch (error) { return console.log(error) }

                })
        } catch (error) { console.log(error) }
    }, 20 * 1000)
});
client.on("messageCreate", message => {
    if (message.author.bot) { return }
    messageString = message.content
    messageString = messageString.toLocaleLowerCase()
    if (!messageString.startsWith("!")) { return }
    messageString = messageString.replace("!", "")
    var guildNames = []
    var guildNames2 = ''
    if (messageString === 'serveramount') {
        if (message.author.id === "398536299537235978") {
            client.guilds.cache.forEach(g => {
                guildNames.push(g.name)
                guildNames2 = guildNames.join(', ')
                guildNames2 = guildNames2.replace(/, /g, '\n')
            })
            var botEmbed = new discord.MessageEmbed()
                .setTitle(`${client.user.username} :heart: [${client.guilds.cache.size}] `)
                .setDescription(guildNames2)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
            message.channel.send({ embeds: [botEmbed] })
        } else { return }
    }
})


const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.clientID),
            { body: slashCommands }
        )
        console.log('succesfully reloaded application (/) commands.');
    } catch (error) {
        console.log(error)
    }
})()
//interact
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand) {
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return;
        try {
            await slashCommand.execute(client, interaction);
        } catch (err) {
            var errorEmbed = new discord.MessageEmbed()
                .setTitle(":x:ERROR:x:")
                .setDescription("Something went horribly wrong!")
                .setColor("RED")
                .setFooter(`© created by philippe#0354`)

            await interaction.reply({ embeds: [errorEmbed] })
            console.log(err)
        }
    }
})
client.on("guildCreate", guild2 => {
    let guild = client.guilds.cache.get("1018244995792257114");
    let channel = guild.channels.cache.get("1024393334007009391")
    let x = client.guilds.cache.size
    channel.setName("Servers Active: " + x.toString())
})
client.on("guildDelete", guild2 => {
    let guild = client.guilds.cache.get("1018244995792257114");
    let channel = guild.channels.cache.get("1024393334007009391")
    let x = client.guilds.cache.size
    channel.setName("Servers Active: " + x.toString())
})
var cron = require('node-cron');

cron.schedule('* 6 1-31 * *', () => {
    var guildName = client.guilds.cache.find(guild => guild.id === "1018244995792257114")
    if (!guildName) { return }
    var role1 = guildName.roles.cache.find(role => role.name === "VOTE");
    if (!role1) { return }
    guildName.roles.create({
        name: role1.name,
        color: role1.color,
        hoist: role1.hoist,
        position: role1.position,
        permissions: role1.permissions,
        mentionable: role1.mentionable

    }).then(x => {
        role1.delete()
    })
});




cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 0-23 1-31 * *', async () => {
    console.log("AUTOROLE UPDATE")
    const firebase = require('firebase/app')
    const { getFirestore, collection, getDocs, query, } = require('firebase/firestore')
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
    const q = query(collection(db, "servers"))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (fG) => {
        var data2 = fG.data()
        if (data2.on === false) { return }
        let x = client.guilds.cache.get(fG.id)
        if (!x) { return }
        if (!x.me.permissions.has("ADMINISTRATOR")) { return }
        var rolePred = x.roles.cache.find(role => role.name === "Predator");
        var roleMasters = x.roles.cache.find(role => role.name === "Masters");
        var roleDiamond = x.roles.cache.find(role => role.name === "Diamond");
        var rolePlatinum = x.roles.cache.find(role => role.name === "Platinum");
        var roleGold = x.roles.cache.find(role => role.name === "Gold");
        var roleSilver = x.roles.cache.find(role => role.name === "Silver");
        var roleBronze = x.roles.cache.find(role => role.name === "Bronze");

        if (!rolePred) { await x.roles.create({ name: "Predator", color: "RED", hoist: true, position: 1 }) }
        if (!roleMasters) { await x.roles.create({ name: "Masters", color: "PURPLE", hoist: true, position: 1 }) }
        if (!roleDiamond) { await x.roles.create({ name: "Diamond", color: "DARKBLUE", hoist: true, position: 1 }) }
        if (!rolePlatinum) { await x.roles.create({ name: "Platinum", color: "BLUE", hoist: true, position: 1 }) }
        if (!roleGold) { await x.roles.create({ name: "Gold", color: "YELLOW", hoist: true, position: 1 }) }
        if (!roleSilver) { await x.roles.create({ name: "Silver", color: "GREY", hoist: true, position: 1 }) }
        if (!roleBronze) { await x.roles.create({ name: "Bronze", color: "#9b5f3d", hoist: true, position: 1 }) }

        var rolePred = x.roles.cache.find(role => role.name === "Predator");
        var roleMasters = x.roles.cache.find(role => role.name === "Masters");
        var roleDiamond = x.roles.cache.find(role => role.name === "Diamond");
        var rolePlatinum = x.roles.cache.find(role => role.name === "Platinum");
        var roleGold = x.roles.cache.find(role => role.name === "Gold");
        var roleSilver = x.roles.cache.find(role => role.name === "Silver");
        var roleBronze = x.roles.cache.find(role => role.name === "Bronze");

        var clientPos = x.roles.cache.find(role => role.name === "Apex")
        if (clientPos.position < rolePred.position || clientPos.position < roleMasters.position || clientPos.position < roleDiamond.position || clientPos.position < rolePlatinum.position || clientPos.position < roleGold.position || clientPos.position < roleSilver.position || clientPos.position < roleBronze.position) { return console.log("HI") }

        const q2 = query(collection(db, "users"))
        const querySnapshot = await getDocs(q2);
        querySnapshot.forEach(async (doc2) => {
            let data = doc2.data()
            let z = x.members.cache.get(doc2.id)
            if (!z) { return }
            let url = `https://api.mozambiquehe.re/bridge?version=5&platform=${data.platform}&player=${data.username}&auth=${process.env.auth}`
            fetch(url)
                .then(res => res.json())
                .then(async data => {
                    if (data.global.rank.rankName === "Predator") { z.roles.add(rolePred) }
                    if (data.global.rank.rankName === "Masters") { z.roles.add(roleMasters) }
                    if (data.global.rank.rankName === "Diamond") { z.roles.add(roleDiamond) }
                    if (data.global.rank.rankName === "Platinum") { z.roles.add(rolePlatinum) }
                    if (data.global.rank.rankName === "Gold") { z.roles.add(roleGold) }
                    if (data.global.rank.rankName === "Silver") { z.roles.add(roleSilver) }
                    if (data.global.rank.rankName === "Bronze") { z.roles.add(roleBronze) }
                })
        })
    });
})


client.login(process.env.token);