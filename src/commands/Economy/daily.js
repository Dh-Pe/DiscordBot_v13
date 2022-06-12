const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Member = require('../../schemas/Member.js');
const { Cooldown } = require('../../structures/Cooldown2.js');
const ms = require('parse-ms');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "daily",
            description: "Coleta sua recompensa diária.",
            category: 'Economy'
        })
    }

    run = async (interaction) => {
        let cool = await Cooldown(86400000, MD5(interaction.guild.id), MD5(interaction.user.id));
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(interaction.user.id) });

        if(cool === true) {
            db.MemberDailyCount = db.MemberDailyCount + 1;
            db.save();
            let embed = new MessageEmbed().setTitle('Daily').setColor("ORANGE").setDescription(`**${interaction.user.username}**, você coletou **1000 coins** no seu Daily.`).setFooter({ text: `Você coletou ${db.MemberDailyCount} ${db.MemberDailyCount > 1 ? 'vezes' : 'vez'} o seu Daily.` })
            interaction.reply({ embeds: [embed] });
        } else {
            let time = ms(86400000 - (Date.now() - db.MemberDailyDOWN));
            let embed = new MessageEmbed().setTitle('Daily').setColor("ORANGE").setDescription(`**${interaction.user.username}**, você já coletou seu Daily! Volte em **${time.hours}:${time.minutes}:${time.seconds}**.`).setFooter({ text: `Você coletou ${db.MemberDailyCount} ${db.MemberDailyCount > 1 ? 'vezes' : 'vez'} o seu Daily.` })
            interaction.reply({ embeds: [embed] });
        }
    }
}