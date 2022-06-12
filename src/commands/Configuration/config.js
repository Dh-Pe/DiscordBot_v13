const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const Guild = require('../../schemas/Guild.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: 'Mostra todas as configurações de canais do servidor.',
            category: 'Configuration'
        })
    }

    run = async (interaction) => {

        let db = await Guild.findOne({ GuildID: MD5(interaction.guild.id) });
        let embed = new MessageEmbed().setTitle('Configurations').setColor("ORANGE")
        if(db.GuildPremium === false) embed.setDescription(`Este servidor não possui **Premium**.`); else embed.setDescription(`Este é um servidor **Premium**.`);
        if(db.WelcomeChannelID !== 'false') embed.addField(`Welcome Channel`, `${this.client.channels.cache.get(db.WelcomeChannelID)}`, true); else embed.addField(`Welcome Channel`, `Não definido`, true);
        if(db.LogChannelID !== 'false') embed.addField(`Log Channel`, `${this.client.channels.cache.get(db.LogChannelID)}`, true); else embed.addField(`Log Channel`, `Não definido`, true);
        if(db.SuggestionChannelID !== 'false') embed.addField(`Suggestion Channel`, `${this.client.channels.cache.get(db.SuggestionChannelID)}`, true); else embed.addField(`Suggestion Channel`, `Não definido`, true);
        if(db.LevelChannelID !== 'false') embed.addField(`Level Channel`, `${this.client.channels.cache.get(db.LevelChannelID)}`, true); else embed.addField(`Level Channel`, `Não definido`, true);
        if(db.TicketChannelID !== 'false') embed.addField(`Ticket Channel`, `${this.client.channels.cache.get(db.TicketChannelID)}`, true); else embed.addField(`Ticket Channel`, `Não definido`, true);

        interaction.reply({ embeds: [embed] });
    }
}