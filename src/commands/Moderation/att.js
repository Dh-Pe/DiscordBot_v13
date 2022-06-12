const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "att",
            description: "Faz com que o bot envie uma mensagem de atualização.",
            category: 'Moderação',
            options: [
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'Mensagem que será enviada no canal.',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        const canal = this.client.channels.cache.get('868194914452779029');
        //const canal = interaction.options.getChannel('canal') //pega o canal digitado
        //if(!['GUILD_TEXT', 'GUILD_ANNOUNCEMENTS'].includes(canal.type)) return interaction.reply({ ephemeral: true, content: 'Erro: informe um canal de textos ou de anúncios.'})
        const texto = interaction.options.getString('mensagem') //pega a mensagem digitada

        const embed = new MessageEmbed()
        .setTitle(`Atualização 1`)
        .setDescription(texto)
        .setColor('RANDOM')

        canal.send({ embeds: [embed] }).then(() => interaction.reply({content: `Mensagem enviada com sucesso ao canal \`${canal.name}\``, ephemeral: true})).catch(() => interaction.reply({content: `Erro: o bot não conseguiu enviar a mensagem.`}))
    }
}