//I WILL BE BACK AFTER 5 min
const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js")
const QUEUE_LIMIT = process.env.QUEUE_LIMIT;
const ms = require('parse-ms');

module.exports = {
  async play(song, interaction) {
    const queue = interaction.client.queue.get(interaction.guild.id);
let embed = new MessageEmbed()
.setColor('ORANGE')

    if (!song) {
      queue.channel.leave();
      interaction.client.queue.delete(interaction.guild.id);
      embed.setAuthor({ name: "Lista de músicas finalizada!" })
      return queue.textChannel
        .send(embed)
        .catch(console.error);
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], interaction);
      }

      if (error.interaction.includes === "copyright") {
        return interaction.reply({ content: "Este vídeo contém direitos autorais!", ephemeral: true });
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], interaction);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], interaction);
        }
      })
      .on("error", console.error);
  
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    let tempo = ms(Number(song.duration) * 1000);
    embed.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
    .setTitle('🎧 | Comecei a tocar!')
    .addField('Música:', `[${song.title}](${song.url})`)
    .addField('Duração:', `${tempo.hours}:${tempo.minutes}:${tempo.seconds}`, true)
    .addField('Adicionada por:', song.author, true)
    .setColor('ORANGE')
    .setFooter({ text: `Dislikes: ` + song.dislikes + ` | Likes: ` + song.likes, iconURL: interaction.guild.iconURL() })
    .setThumbnail(song.thumbnail)
    
    queue.textChannel
      .send(embed)
      .catch(err => interaction.channel.send("Incapaz de tocar a música!"));
  }
};