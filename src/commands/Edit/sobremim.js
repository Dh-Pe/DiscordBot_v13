const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'sobremim',
            description: 'Altera as informações do SobreMim do seu perfil.',
            category: 'Edit',
            options: [
                {
                    name: 'frase',
                    type: 'STRING',
                    required: true,
                    description: 'Frase que deseja utilizar no seu SobreMim.'
                }
            ]
        })
    }

    run = async (interaction) => {
        let db = await Member.findOne({ GuildID: interaction.guild.id, MemberID: interaction.user.id });
        let frase = interaction.options.getString('frase');
        if(frase.length > 25) return interaction.reply({ content: 'Seu SobreMim não pode ter mais de 25 letras.', ephemeral: true });
        db.MemberAM = frase;
        db.save();
        interaction.reply({ embeds: [new MessageEmbed().setTitle('About Me').setDescription(`Seu novo SobreMim: ${frase}`).setColor("ORANGE")] })
    }
}