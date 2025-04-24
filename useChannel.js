async function CreateForumChannel(message) {
  const name = "DsDev-Forum";

  const existingChannel = await GetChannelByName(message.guild, name);
  if (existingChannel) {
    console.log(`⏭️ Skipped CreateForumChannel process. Channel '${name}' already exists.`);
    return existingChannel;
  }

  const newChannel = await message.guild.channels.create({
    name: name,
    type: 4,
    reason: "Creado desde el bot",
  });
  console.log(`✅ CreateForumChannel with name ${name}.`);
  return newChannel;
}

async function CreateNewChannel(message, channel, type, name) {
  const existingChannel = await GetChannelByName(message.guild, name);
  if (existingChannel) {
    console.log(`⏭️ Skipped CreateNewCahnnel process. Channel '${name}' already exists.`);
    return existingChannel;
  }

  try {
    const channel = await message.guild.channels.create({
      name: name,
      type: type,
      reason: "Creado desde el bot",
      parent: channel.id
    });
    console.log(`✅ CreateForumForums type${type} with name ${name}.`);

    return channel;
  }
  catch (e) {
    console.log(`❌ CreateForumForums type${type} with name ${name}.`);
  }
}

async function GetChannelByName(guild, name) {
  return guild.channels.cache.find(
    (channel) => channel.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

module.exports = { CreateForumChannel, CreateNewChannel };