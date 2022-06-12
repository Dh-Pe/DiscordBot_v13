const Event = require('../../structures/Event.js');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../schemas/Guild.js');
const Member = require('../../schemas/Member.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd"
        })
    }

    run = async (member) => {
        let dbGuild = await Guild.findOne({ GuildID: member.guild.id });
        if(member.bot === false) new Member({ GuildID: member.guild.id, MemberID: member.id }).save();

        if(dbGuild.WelcomeChannelID === 'false') return;
        let channel = this.client.channels.cache.get(dbGuild.WelcomeChannelID);
        let embed = new MessageEmbed().setTitle('Welcome').setDescription(`Seja bem vindo ao ${member.guild.name}, **${member.user.username}**!`).setColor("ORANGE");

        channel.send({ content: `${member}`, embeds: [embed] });

    }
}