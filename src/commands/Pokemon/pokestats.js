const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Pokemon = require('pokemon.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "pokestats",
            description: "Mostra as informações do pokémon desejado.",
            category: 'Pokémon',
            options: [
                {
                    name: 'pokémon',
                    type: 'STRING',
                    description: 'Pokémon que deseja saber os status.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const poke = interaction.options.getString('pokémon');

        try {
            let infos = await Pokemon.getStats(poke);
            let embed = new MessageEmbed()
                .setTitle('PokeStats')
                .setColor("ORANGE")
                .addField('HP:', String(infos.hp), true)
                .addField('Attack:', `${infos.attack}`, true)
                .addField('Defense:', `${infos.defense}`, true)
                .addField('Special-Attack:', `${infos['special-attack']}`, true)
                .addField('Special-Defense:', `${infos['special-defense']}`, true)
                .addField('Speed:', `${infos.speed}`, true)
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            interaction.reply({ content: 'Pokémon inválido...', ephemeral: true})
        }
    }
}