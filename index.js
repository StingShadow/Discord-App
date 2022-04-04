var Canvas = require("canvas");
var Discord = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders')
var Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        ]
});

var prefix = "!";



Client.on("ready", async () => {
    console.log("bot opérationnel");
});

Client.on("messageCreate", message =>{
    if (message.author.bot) return;
    if (message.content === prefix + "help"){
        message.channel.send("**__Tu a cru que je pouvais t'aider ? Non en vrai tient la liste__**\n - !ping : renvoie pong\n - !help : la commande que tu viens de tapper..Tu a déja oublier ?");
    }
    if (message.content === prefix + "ping"){
        message.reply("pong")
    }

    if(message.content === prefix + "help2"){
       const embed = new Discord.MessageEmbed()
       .setColor("#DA0E20")
       .setTitle("Liste des commandes")
       .setAuthor("auteur : Sting Shadow#8757","https://i.imgur.com/z9u3CBO.png?1","https://github.com/StingShadow/Mirror-App","")
       .setDescription("Voici la liste des commandes disponibles")
       .setThumbnail("https://i.imgur.com/z9u3CBO.png?1")
       .addField("!help","Besoin d'une explications réellement ?")
       .addField("!ping","On joue au ping pong ?");
       

        message.channel.send({embeds:[embed]});
    }

    if(message.content.startsWith(prefix + "clear")){
        const amount = message.content.split(" ")[1];
        if(!amount)
        {
            message.reply(`<amount>`);
            return;
        }
         if(!message.member.permissions.has("MANAGE_MESSAGES"))
         {
            message.channel.send('Vous ne pouvez pas faire ça, permissions manquantes.');
            return;
         }
        message.channel.bulkDelete(amount)
        //.then(messages => message.channel.send(`${messages.size} Messages deleted`))
    .then(messages => message.channel.send(`Message suprimée par ${message.author.username}`))
    .catch(console.error).then(messages => {
        setTimeout(() => {
            messages.delete()
        }, 5000);
    })};
}); 

Client.on("guildMemberAdd", async member => {
    Client.channels.cache.get("936336295800746017").send("<@"+member.id+"> est arrivé parmis nous");

    var canvas = Canvas.createCanvas(1024,500);
    ctx = canvas.getContext("2d");
    var background = await Canvas.loadImage("./background.jpg");
    ctx.drawImage(background, 0 , 0, 1024, 500);

    ctx.font = "42px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410);

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0 , Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 393,47,238,238);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
    Client.channels.cache.get("936336295800746017").send({files: [attachment]});
});




Client.login("NzIyMDk4MjkxOTkwNDYyNTA1.XueIcA.XXvz4YfFubq_ug3GHDnvkuSfXNo");