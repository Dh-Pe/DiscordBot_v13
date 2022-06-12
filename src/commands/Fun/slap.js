const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "slap",
            description: "Faz com que o bot envie uma mensagem de atualização.",
            category: 'Diversão',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário que você deseja utilizar essa interação.',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        //const canal = interaction.options.getChannel('canal') //pega o canal digitado
        //if(!['GUILD_TEXT', 'GUILD_ANNOUNCEMENTS'].includes(canal.type)) return interaction.reply({ ephemeral: true, content: 'Erro: informe um canal de textos ou de anúncios.'})
        const cara = interaction.options.getUser('usuário');

        const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username} deu um tapa em ${cara.username}`)
        .setColor('RANDOM')
        .setImage('https://i.pinimg.com/originals/43/a3/0a/43a30a58f59d591b5791879f985d5e95.gif')

        interaction.reply({ embeds: [embed] });
    }
}