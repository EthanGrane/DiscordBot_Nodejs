
async function CreateNewForumPost(message, title, description) 
{
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

  module.exports = { CreateNewForumPost };