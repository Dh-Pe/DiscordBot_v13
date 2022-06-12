const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Mostra o ping do bot.",
            category: 'Informação'
        })
    }

    run = async (interaction) => {
        let embed = new MessageEmbed()
        embed.setTitle('Ping!').setColor('ORANGE').addField('Latência da API:', `${Math.round(this.client.ws.ping)}ms`);
        interaction.reply({ embeds: [embed]})
    }
}