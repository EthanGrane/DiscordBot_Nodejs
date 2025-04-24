const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { CreateForumPost } = require("./useForumPost.js");
const { CreateForumChannel, CreateNewChannel } = require("./useChannel.js");
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

  if (message.author.bot) return;

  if (message.content === "!help")
    CMD_Help(message);

  if (message.content === "!initialize")
    CMD_InitializeForum(message);

});

async function CMD_Help(message) {
  message.channel.send
    (`
    Help:
    > \`\`\`!initialize\`\`\`
    -> Initialize the server channels.
    > \`\`\`!initialize\`\`\`
    -> Initialize the server channels.
    `);
}

async function CMD_InitializeForum(message) {
  const channel = await CreateForumChannel(message);

  // Crear los subcanales
  const showoffChannel = await CreateNewChannel(message, channel, 0, "Showoff");
  const discussionChannel = await CreateNewChannel(message, channel, 15, "Discussion");
  const gameChannel = await CreateNewChannel(message, channel, 0, "Game");

  // Comprobamos si los canales fueron creados correctamente
  const showoffId = showoffChannel ? showoffChannel.id : null;
  const discussionId = discussionChannel ? discussionChannel.id : null;
  const gameId = gameChannel ? gameChannel.id : null;

  // Enviar mensaje con enlaces a los canales creados
  const messageContent = `
    ¡El canal DsDev-Forum ha sido creado con éxito!
    ${showoffId ? `<#${showoffId}>` : ''}
    ${discussionId ? `<#${discussionId}>` : ''}
    ${gameId ? `<#${gameId}>` : ''}
  `;

  // Enviar mensaje en el canal donde se ejecutó el comando
  message.channel.send(messageContent);
}

client.login(process.env.TOKEN);
