const Event = require('../../structures/Event.js');
const { MessageEmbed } = require('discord.js');
const Member = require('../../schemas/Member.js');
const { Job } = require('../../structures/Jobs.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        })
    }

    run = async (message) => {
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;

        let MessageAuthorID = await MD5(message.author.id);
        let MessageGuildID = await MD5(message.guild.id);
        global.nextLevel = '';
        let pointsAdd = Math.floor(Math.random() * 7) + 8;
        let db = await Member.findOne({ GuildID: MessageGuildID, MemberID: MessageAuthorID });

        if (!db) new Member({ GuildID: MessageGuildID, MemberID: MessageAuthorID }).save();
        else {
            let trabalho = Job(false, db.MemberJOB + 1);
            db.MemberXP = db.MemberXP + pointsAdd;
            nextLevel = db.MemberLVL * 1000;

            if (nextLevel <= db.MemberXP) {
                db.MemberLVL++;
                let embed = new MessageEmbed().setTitle('Up!').addField('Level Anterior:', `${db.MemberLVL - 1}`, true).addField('Level Atual:', `${db.MemberLVL}`, true).setColor('ORANGE').setDescription(`**${message.author.username}**, você passou de level!`);
                if (db.MemberLVL >= trabalho.required) db.MemberJOB++ && embed.addField('Novo emprego:', `${Job(false, db.MemberJOB).job}`, true);
                message.reply({ embeds: [embed] });
            }
            db.save();
        }
    }
}