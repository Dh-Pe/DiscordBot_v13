require('colors')
const Command = require('../../structures/Command.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const superagent = require('superagent');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "reward",
            description: "Cria uma conquista do Minecraft.",
            category: 'Diversão',
            options: [
                {
                    name: 'mensagem',
                    description: 'mensagem que irá aparecer na imagem.',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let mensagem = interaction.options.getString("mensagem");
        if(mensagem.length > 25) return interaction.reply({ content: 'A mensagem passou de 25 caracteres.', ephemeral: true });

        try {
            const { body } = await superagent.get('https://www.minecraftskinstealer.com/achievement/a.php').query({i: 1, h: 'Conquista desbloqueada!', t: mensagem});
            interaction.reply({ files: [body] })
        } catch(e) {
            console.log(`${e}`.red)
            interaction.reply({ content: 'Ocorreu um erro, tente novamente.', ephemeral: true })
        }

    }
}