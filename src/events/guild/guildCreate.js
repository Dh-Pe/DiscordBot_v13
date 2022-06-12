const Event = require('../../structures/Event.js');
const { MessageEmbed } = require('discord.js');
const Member = require('../../schemas/Member.js');
const Guild = require('../../schemas/Guild.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildCreate"
        })
    }

    run = async (guild) => {
        this.client.registryCommands();
        new Guild({ GuildID: guild.id }).save();
        guild.members.cache.forEach(member => {
            if (member.user.bot) return;
            new Member({ GuildID: guild.id, MemberID: member.id }).save();
        })

    }
}