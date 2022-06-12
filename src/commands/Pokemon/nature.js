const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Pokemon = require('pokemon.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "nature",
            description: "Mostra as informações da nature desejada.",
            category: 'Pokémon',
            options: [
                {
                    name: 'nature',
                    type: 'STRING',
                    description: 'Nature desejada.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const natureza = interaction.options.getString('nature');

        try {
            let infos = await Pokemon.getNature(natureza);
            let embed = new MessageEmbed()
                .setTitle('Nature!')
                .setColor("ORANGE")
                .addField('Aumenta:', infos.increased_stat, true)
                .addField('Diminui:', infos.decreased_stat, true)
            interaction.reply({ embeds: [embed] });
        } catch (e) {
            interaction.reply({ content: 'Nature inválida...', ephemeral: true })
        }
    }
}