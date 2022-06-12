const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Pokemon = require('pokemon.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "evolution",
            description: "Mostra as informações do pokémon desejado.",
            category: 'Pokémon',
            options: [
                {
                    name: 'pokemon',
                    type: 'STRING',
                    description: 'Pokémon que deseja saber a evolução.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const poke = interaction.options.getString('pokemon');

        try {
            let embed = new MessageEmbed()

            let linha = await Pokemon.getEvolutionLine(poke);

            for (let i = 0; i < 3; i++) {
                if (!linha[i]) return;
                let io = i + 1;
                embed.addField(`${io}ª Evolução`, linha[i], true);
            }

            embed.setTitle('Evolution!')
            embed.setColor("ORANGE")
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            interaction.reply({ content: 'Digite um Pokémon válido...', ephemeral: true })
        }
    }
}