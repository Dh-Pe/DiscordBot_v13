const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Member = require('../../schemas/Member.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'perfil',
            description: 'Exibe o perfil.',
            category: 'Social',
            options: [
                {
                    name: 'usuario',
                    description: 'Usuário que deseja utilizar esta interação.',
                    type: 'USER'
                }
            ]
        })
    }

    run = async (interaction) => {
        let user;
        if(interaction.options.getUser('usuario')) user = interaction.options.getUser('usuario'); else user = interaction.user;
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(user.id) });
        let embed = new MessageEmbed().setTitle('Perfil').addField('Sobre mim', `${db.MemberAM}`, true).addField('Meu level', `${db.MemberLVL}`, true).addField('Sou Premium?', `${db.MemberPremium === false ? 'Não' : 'Sim'}`, true).setColor("ORANGE")
        interaction.reply({ embeds: [embed] });
    }
}