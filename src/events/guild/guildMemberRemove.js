const Event = require('../../structures/Event.js');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../schemas/Guild.js');
const Member = require('../../schemas/Member.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove"
        })
    }

    run = async (member) => {
        let dbGuild = await Guild.findOne({ GuildID: member.guild.id });
        if(member.bot === true) return;
        if(member.bot === false) Member.deleteOne({ GuildID: member.guild.id, MemberID: member.id });
        if(dbGuild.WelcomeChannelID === 'false') return;
        let channel = this.client.channels.cache.get(dbGuild.WelcomeChannelID);
        let embed = new MessageEmbed().setTitle('Bye').setDescription(`**${member.user.username}** saiu de ${member.guild.name}, espero que volte!`).setColor("ORANGE");

        channel.send({ embeds: [embed] });

    }
}