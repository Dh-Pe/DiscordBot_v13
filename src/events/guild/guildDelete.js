const Event = require('../../structures/Event.js');
const Member = require('../../schemas/Member.js');
const Guild = require('../../schemas/Guild.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildDelete"
        })
    }

    run = async (guild) => {
        let dbGuild = await Guild.deleteOne({ GuildID: guild.id });
        guild.members.cache.forEach(async membros => {
            if(membros.bot === true) return;
            await Member.deleteOne({ GuildID: guild.id, MemberID: membros.id });
        });
    }
}