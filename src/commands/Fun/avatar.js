const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Exibe o avatar de algum membro.",
            category: 'Diversão',
            options: [
                {
                    name: 'membro',
                    type: 'USER',
                    description: 'Usuário que deseja utilizar essa interação.',
                    required: false
                }
            ]
        })
    }

    run = (interaction) => {
        let membro = interaction.options.getUser("membro");
        if(!membro) membro = interaction.user;

        let embed = new MessageEmbed()
        .setTitle('Avatar')
        .setDescription(`Foto de ${membro.username}`)
        .setImage(membro.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setColor('ORANGE')
        interaction.reply({ embeds: [embed] })
    }
}