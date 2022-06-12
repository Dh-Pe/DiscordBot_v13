const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed } = require('discord.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "bal",
            description: "Exibe quanto de dinheiro você possui.",
            category: 'Economia'
        })
    }

    run = async (interaction) => {
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(interaction.user.id) });

        let embed = new MessageEmbed()
        .setTitle('Bal')
        .setDescription(`Você possui **${db.MemberCOIN} coins** em seu banco.`)
        .setColor('ORANGE')
        interaction.reply({ embeds: [embed] });   
    }
}