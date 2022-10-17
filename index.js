const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const discord = require("discord.js")
const fs = require("fs");
const cron = require('node-cron');
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
    console.log(`File Loaded | ${fileSlash}`);
};

//presence
client.once("ready", async () => {
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
    messageString = messageString.split(' ');
    var guildNames = []
    var guildNames2 = ''
    if (messageString[0] === 'serveramount') {

        if (message.author.id === "398536299537235978") {
            client.guilds.cache.forEach(g => {
                guildNames.push(g.name)
                guildNames2 = guildNames.join(', ')
                guildNames2 = guildNames2.replace(/, /g, '\n')
            })
            var botEmbed = new discord.MessageEmbed()
                .setTitle(`${client.user.username} :heart: [${client.guilds.cache.size}]`)
                .setDescription(guildNames2)
                .setFooter(`${client.user.username} ❤️`)
                .setTimestamp()
            message.channel.send({ embeds: [botEmbed] })
        } else { return }
    }
    if (messageString[0] === 'server') {
        if (message.author.id === "398536299537235978") {
            var serverID = messageString[1]
            let server = client.guilds.cache.get(serverID)
            if (!server) {

                var botEmbed = new discord.MessageEmbed()
                    .setTitle(`:x: ${serverID} :x: `)
                    .setDescription("NOT FOUND")
                    .setFooter(`${client.user.username} ❤️`)
                    .setTimestamp()
                    .setColor("RED")
                message.channel.send({ embeds: [botEmbed] })

            } else {
                if (server.icon === null) {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${server.name} | ${server.id}`)
                        .setDescription("SERVER FOUND")
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setColor("GREEN")
                    return message.channel.send({ embeds: [botEmbed] })
                } else {
                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`${server.name} | ${server.id}`)
                        .setThumbnail(server.iconURL())
                        .setDescription("SERVER FOUND")
                        .setFooter(`${client.user.username} ❤️`)
                        .setTimestamp()
                        .setColor("GREEN")
                    message.channel.send({ embeds: [botEmbed] })
                }
            }

        }
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
client.on("guildCreate", () => {
    let guild = client.guilds.cache.get("1018244995792257114");
    let channel = guild.channels.cache.get("1024393334007009391")
    let x = client.guilds.cache.size
    channel.setName("Servers Active: " + x.toString())
})

client.on("guildDelete", async guildDelete => {
    let guild = client.guilds.cache.get("1018244995792257114");
    let channel = guild.channels.cache.get("1024393334007009391")
    let x = client.guilds.cache.size
    channel.setName("Servers Active: " + x.toString())

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

    const docRef2 = doc(db, 'servers', guildDelete.id)
    const docSnap = await getDoc(docRef2)

    if (docSnap.exists()) {
        deleteDoc(docRef2).then(() => {
            console.log(`${guildDelete.name} REMOVED BOT. REMOVED FROM DB`)
        })
    } else {
        return
    }
})

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

    }).then(() => {
        try {
            role1.delete()
        } catch (err) { console.log(err) }
    })
});




cron.schedule('0 12,0 1-31 * *', async () => {
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
        if (data2.on === false) { return } else {
            let x = client.guilds.cache.get(fG.id)
            if (!x) { return console.log("NO GUILD FOUND -1") } else {
                //console.log(x.name)
                if (!x.me.permissions.has("ADMINISTRATOR")) { return } else {
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
                    if (clientPos.position < rolePred.position || clientPos.position < roleMasters.position || clientPos.position < roleDiamond.position || clientPos.position < rolePlatinum.position || clientPos.position < roleGold.position || clientPos.position < roleSilver.position || clientPos.position < roleBronze.position) { return console.log("Can't acces role in guild" + x.name) } else {

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
                                    if (!data.global) { return }
                                    if (data.error) { return }
                                    if (data.Error) { return }
                                    if (data.global.rank.rankName === "Predator") {
                                        if (z.roles.cache.has(rolePred.id)) { return } else {
                                            if (z.roles.cache.has(roleMasters.id)) { z.roles.remove(roleMasters) }
                                            z.roles.add(rolePred)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Masters") {
                                        if (z.roles.cache.has(roleMasters.id)) { return } else {
                                            if (z.roles.cache.has(rolePred.id)) { z.roles.remove(rolePred) }
                                            if (z.roles.cache.has(roleDiamond.id)) { z.roles.remove(roleDiamond) }
                                            z.roles.add(roleMasters)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Diamond") {
                                        if (z.roles.cache.has(roleDiamond.id)) { return } else {
                                            if (z.roles.cache.has(roleMasters.id)) { z.roles.remove(roleMasters) }
                                            if (z.roles.cache.has(rolePlatinum.id)) { z.roles.remove(rolePlatinum) }
                                            z.roles.add(roleDiamond)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Platinum") {
                                        if (z.roles.cache.has(rolePlatinum.id)) { return } else {
                                            if (z.roles.cache.has(roleDiamond.id)) { z.roles.remove(roleDiamond.id) }
                                            if (z.roles.cache.has(roleGold.id)) { z.roles.remove(roleGold) }
                                            z.roles.add(rolePlatinum)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Gold") {
                                        if (z.roles.cache.has(roleGold.id)) { return } else {
                                            if (z.roles.cache.has(rolePlatinum.id)) { z.roles.remove(rolePlatinum) }
                                            if (z.roles.cache.has(roleSilver.id)) { z.roles.remove(roleSilver) }
                                            z.roles.add(roleGold)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Silver") {
                                        if (z.roles.cache.has(roleSilver.id)) { return } else {
                                            if (z.roles.cache.has(roleGold.id)) { z.roles.remove(roleGold) }
                                            if (z.roles.cache.has(roleBronze.id)) { z.roles.remove(roleBronze) }
                                            z.roles.add(roleSilver)
                                        }
                                    }
                                    if (data.global.rank.rankName === "Bronze") {
                                        if (z.roles.cache.has(roleBronze.id)) { return } else {
                                            if (z.roles.cache.has(roleSilver.id)) { z.roles.remove(roleSilver) }
                                            z.roles.add(roleBronze)
                                        }
                                    }

                                })
                        })
                    }
                }
            }
        }
    });
})













const timers = {};

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) {
        if(interaction.isCommand()){
            if (interaction.commandName === 'heirloom') {
                timers[interaction.id] = setTimeout(() => {
                    interaction.editReply({ components: [] })
                }, 10000);
            }
        }
        return;
    }
    if (interaction.customId === 'heirlooms') {

        const int = interaction

        if (timers[interaction.message.interaction.id]) clearTimeout(timers[interaction.message.interaction.id]);
        timers[interaction.message.interaction.id] = setTimeout(() => {
            int.editReply({ components: [] })
        }, 10000);

        let legendImage = Number(interaction.values[0])
        legendImage--

        const nameArray = [
            { name: "Loba", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/15112334/Loba-heirloom-1536x864.jpeg" },
            { name: "Valkyrie", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133636/Valkyrie-heirloom-1536x865.jpeg" },
            { name: "Crypto", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133723/Crypto-heirloom-1536x864.jpeg" },
            { name: "Wattson", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133630/Wattson-heirloom-1536x865.jpeg" },
            { name: "Rampart", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133644/Rampart-heirloom-1536x865.jpeg" },
            { name: "Revenant", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133640/Revenant-heirloom-1536x865.jpeg" },
            { name: "Bangalore", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14132411/Bangalore-heirloom-1536x864.jpeg" },
            { name: "Gibraltar", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133716/Gibraltar-heirloom-1536x864.jpeg" },
            { name: "Caustic", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133729/Caustic-heirloom-1536x864.jpeg" },
            { name: "Mirage", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133703/Mirage-heirloom-1536x864.jpeg" },
            { name: "Octane", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133657/Octane-heirloom-1536x865.jpeg" },
            { name: "Pathfinder", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133651/Pathfinder-heirloom-1536x864.jpeg" },
            { name: "Lifeline", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133710/Lifeline-heirloom-1536x864.jpeg" },
            { name: "Bloodhound", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133737/Bloodhound-heirloom-1536x864.jpeg" },
            { name: "Waith", url: "https://cdn1.dotesports.com/wp-content/uploads/2022/09/14133622/Wraith-heirloom-1536x865.jpeg" },
        ]

        var botEmbed = new discord.MessageEmbed()
            .setTitle(nameArray[legendImage].name)
            .setFooter(`${client.user.username} ❤️`)
            .setImage(nameArray[legendImage].url)
            .setTimestamp()

        interaction.update({ embeds: [botEmbed], ephemeral: true })
    }
    if (interaction.customId === 'loadout') {
        var x = interaction.values[0]

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

        var botEmbed = new discord.MessageEmbed()
            .setDescription(`Use **${weapons[x].name}** this round!`)
            .setFooter(`${client.user.username} ❤️`)
            .setImage(weapons[x].url)
            .setTimestamp()

        interaction.update({ embeds: [botEmbed], ephemeral: true })

    }


})








client.login(process.env.token);