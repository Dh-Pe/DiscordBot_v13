const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const moment = require('moment');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            description: 'Mostra todas as informações do bot.',
            category: 'Utils'
        })
    }

    run = async (interaction) => {

        const botAvatar = this.client.user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        const date = this.client.user.createdAt;
        const userName = this.client.user.username;
        const servsize = this.client.guilds.cache.size;
        const usersize = this.client.users.cache.filter(a => a.bot === false).size;
        const botsize = this.client.users.cache.filter(a => a.bot === true && a.id != this.client.user.id).size;
        const comandos = this.client.commands.length;
        const status = { online: '`🟢` Online', offline: '`⚫` Offline' }
        let dias = 0;
        let semanas = 0;
        let uptime = ``;
        let totalSegundos = (this.client.uptime / 1000);
        let horas = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = Math.floor(totalSegundos % 60);

        if (horas > 23) dias = dias + 1; horas = 0;

        if (dias == 7) dias = 0; semanas = semanas + 1;

        if (semanas > 0) uptime += `${semanas} semanas, `;

        if (minutos > 60) minutos = 0;

        uptime += `${dias} Dias, ${horas} Horas, ${minutos} Minutos, ${segundos} Segundos`;

        const embed = new MessageEmbed()
            .setThumbnail(botAvatar)
            .setColor('ORANGE')
            .setTitle('Minhas informações')
            .addField('→ `Meu nick`', userName)
            .addField('→ `Meu ID`', this.client.user.id)
            .addField('→ `Servidores`', 'Estou em ' + servsize + ' servidores', true)
            .addField('→ `Usuários`', usersize + ' usuários', true)
            .addField('→ `Comandos`', String(comandos), true)
            .addField('→ `Bots`', String(botsize), true)
            .addField('→ `Criado em`', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
            .addField('→ `Estou online a`', uptime)
            .addField('→ `Latência de API`', Math.round(this.client.ws.ping) + `ms`, true)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ size: 1024, format: 'png', dynamic: true }) })
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ size: 1024, format: 'png', dynamic: true }) })
            .setTimestamp()

        if (this.client.user.presence.status) embed.addField('→ `Status`',`${status[this.client.user.presence.status]}`, true)

        interaction.reply({ embeds: [embed] })

    }
}

function formatDate (template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
      return template.split(specs[i]).join(item)
    }, template)
} 