const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { MD5 } = require('hash-converter');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "pay",
            description: "Envia coin a algum outro membro.",
            category: 'Economia',
            options: [
                {
                    name: 'usuario',
                    description: 'Usuário que deseja utilizar esta interação.',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'quantia',
                    description: 'Quantia monetária que deseja enviar.',
                    type: 'NUMBER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let buttons = new MessageActionRow().addComponents(
            new MessageButton().setLabel('Cancelar').setCustomId('cancel').setStyle('DANGER').setEmoji('❌'),
            new MessageButton().setLabel('Enviar').setCustomId('sucess').setStyle('SUCCESS').setEmoji('✅')
        )
        let user = interaction.options.getUser('usuario');
        if (user.id === interaction.user.id) return interaction.reply({ content: 'Você não pode enviar coins para si mesmo.', ephemeral: true });
        //if (user.bot) return interaction.reply({ content: 'Você não pode enviar moedas para um robô.', ephemeral: true });
        let quantia = interaction.options.getNumber('quantia');
        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(interaction.user.id) })
        let db2 = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(user.id) })
        if (quantia > db.MemberCOIN) return interaction.reply({ content: 'Você não pode enviar mais coins do que possui.', ephemeral: true })
        if (quantia < 0) return interaction.reply({ content: 'Você não pode enviar quantia de coins negativa.', ephemeral: true })
        let filter = i => i.customId === 'cancel' || i.customId === 'sucess' && i.user.id === interaction.user.id;
        let collector = interaction.channel.createMessageComponentCollector({ filter, time: 60 * 1000 * 2 });
        let embed = new MessageEmbed().setTitle('Pay').setDescription(`Você realmente deseja enviar **${quantia} coins** para ${user.username}?`).setColor("ORANGE");
        interaction.reply({ embeds: [embed], components: [buttons] });

        let embed2 = new MessageEmbed().setTitle('Pay').setColor("ORANGE");

        collector.on('collect', async i => {

            if (i.customId === 'cancel') {
                embed2.setDescription(`Envio cancelado.`)
                await i.update({ embeds: [embed2], components: [] });
            }
            if (i.customId === 'sucess') {
                db.MemberCOIN = db.MemberCOIN - quantia;
                db2.MemberCOIN = db2.MemberCOIN + quantia;
                db.save();
                db2.save();
                embed2.setDescription(`**${quantia} coins** enviados para **${user.username}**.`)
                await i.update({ embeds: [embed2], components: [] });
            }
        });

        collector.on('end', async i => {
           await i.update({ embeds: [], components: [], content: "⏰ | **Acabou o tempo...**" })
        })
    }
}