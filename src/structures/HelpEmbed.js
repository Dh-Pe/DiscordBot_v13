require('colors');
const HelpEmbed = async (interaction, paginas, components, timeout = 120000) => {
    if (!interaction && !interaction.channel) throw new Error('Canal Inacessível.'.red);
    if (!paginas) throw new Error('As páginas não foram definidas'.red);
    if (!components) throw new Error('Não possui botões.'.red);

    let pagina = 0;
    const curPage = await interaction.reply({ embeds: [paginas[pagina].setFooter({ text: `Page ${pagina + 1} / ${paginas.length}` })], components: [components] });
    const filter = i => i.customId === 'next' || i.customId === 'previous' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', i => {
        switch (i.customId) {
            case 'previous':
                pagina = pagina > 0 ? --pagina : paginas.length - 1;
                break;
            case 'next':
                pagina = pagina + 1 < paginas.length ? ++pagina : 0;
                break;
            default:
                break;
        }
        i.update({ embeds: [paginas[pagina].setFooter({ text: `Page ${pagina + 1} / ${paginas.length}` })], components: [components] });
    });
    collector.on('end', async () => {
        interaction.editReply({ embeds: [], components: [], content: '⏰ | **Acabou o tempo...**' })
    });
    return curPage;
};
module.exports = HelpEmbed;