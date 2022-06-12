const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed } = require('discord.js');
const { Job } = require('../../structures/Jobs.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "jobs",
            description: "Exibe as profissões que você pode conseguir.",
            category: 'Economia'
        })
    }

    run = async (interaction) => {
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(interaction.user.id) });
        let trabalhos = Job(true);
        let embed = new MessageEmbed()
        for(let trabalho of trabalhos) {
            embed.addField(`${trabalho.job}`, `Salário: ${trabalho.bal}\nLevel Requirido: ${trabalho.required}`, true);
        }


        embed.setTitle('Jobs')
        .setDescription(`Você trabalha de ${Job(false, db.MemberJOB).job}.`)
        .setColor('ORANGE')
        interaction.reply({ embeds: [embed] });   
    }
}