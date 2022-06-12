const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed } = require('discord.js');
const { Job } = require('../../structures/Jobs.js');
const { Cooldown } = require('../../structures/Cooldown.js');
const ms = require('parse-ms');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "work",
            description: "Faz com que você ganhe coins trabalhando.",
            category: 'Economia'
        })
    }

    run = async (interaction) => {
        let cool = await Cooldown(86400000/2, MD5(interaction.guild.id), MD5(interaction.user.id));
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(interaction.user.id) });
        let trabalho = Job(false, db.MemberJOB);
        let embed = new MessageEmbed().setColor('ORANGE');
        if(cool === true) {
            embed.setTitle('Receive').setDescription(`Você recebeu **${trabalho.bal} coins** por trabalhar como **${trabalho.job}**`)
        } else {
            let time = ms(86400000/2 - (Date.now() - db.MemberDOWN));
            embed.setTitle('Received').setDescription(`Você já coletou seu salário. Volte em **${time.hours}:${time.minutes}:${time.seconds}**`)
        }

        interaction.reply({ embeds: [embed] });
    }
}