const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  // Start / Init
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  // on message created (on any channel)

  if (message.author.bot) return; // if message author is a bot, return

  if (message.content === "!createForumPost")   // If message content is ?, do something
  {
    await CreateForumPost(message, "Title", "Description");
  }
});

client.login(process.env.TOKEN);

async function CreateForumPost(message, title, description) {
  const channelName = "forum-test";

  try {
    const forumChannel = message.guild.channels.cache.find(
      (ch) => ch.name === channelName && ch.type === ChannelType.GuildForum
    );

    if (!forumChannel) {
      return message.reply(`No se encontró el canal de foro llamado ${channelName}.`);
    }

    await forumChannel.threads.create({
      name: title,
      message: {
        content: description,
      },
    });

    await message.reply("¡Publicación en el foro creada con éxito!");
  } 
  catch (error) 
  {
    console.error("Error al crear la publicación en el foro:", error);
    await message.reply("Hubo un error al intentar crear la publicación.");
  }

}