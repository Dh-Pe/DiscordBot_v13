const Command = require('../../structures/Command.js');
const { MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js');
const HelpEmbed = require('../../structures/HelpEmbed.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Mostra todos os comandos do bot.",
            category: 'Informação'
        })
    }

    run = async (interaction) => {
        let buttons = new MessageActionRow().addComponents(
            new MessageButton().setLabel('Previous').setCustomId('previous').setStyle('SECONDARY').setEmoji('🔙'),
            new MessageButton().setLabel('Next').setCustomId('next').setStyle('SECONDARY').setEmoji('🔜')
        )

        let embedDiv = new MessageEmbed().setTitle('Diversão').setColor('ORANGE')
        let embedInf = new MessageEmbed().setTitle('Informações').setColor('ORANGE')
        let embedMod = new MessageEmbed().setTitle('Moderação').setColor('ORANGE')
        let embedPok = new MessageEmbed().setTitle('Pokémon').setColor('ORANGE')
        let embedEco = new MessageEmbed().setTitle('Economia').setColor('ORANGE')
        let embedLev = new MessageEmbed().setTitle('Level').setColor('ORANGE')
        let embedCon = new MessageEmbed().setTitle('Configuração').setColor('ORANGE')

        this.client.commands.forEach(a => {
            switch(a.category) {
                case 'Diversão':
                    embedDiv.addField('/' + a.name, a.description)
                    break;
                case 'Informação':
                    embedInf.addField('/' + a.name, a.description)
                    break;
                case 'Moderação':
                    embedMod.addField('/' + a.name, a.description)
                    break;
                case 'Pokémon':
                    embedPok.addField('/' + a.name, a.description)
                    break;
                case 'Economia':
                    embedEco.addField('/' + a.name, a.description)
                    break;
                case 'Level':
                    embedLev.addField('/' + a.name, a.description)
                    break;
                case 'Configuration':
                    embedCon.addField('/' + a.name, a.description)
                    break;
            }
        })

        let embeds = [embedDiv, embedInf, embedMod, embedPok, embedEco, embedLev, embedCon];

        HelpEmbed(interaction, embeds, buttons, 60 * 2 * 1000)
    }
}