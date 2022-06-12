const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Interação somente para desenvolvedores",
            category: 'Owner',
            options: [
                {
                    name: 'code',
                    type: 'STRING',
                    description: 'Código a ser testado',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        let command = interaction.options.getString("code");
        let chaves = ["token", "destroy", "exit"];

        if (chaves.some(word => command.toLowerCase().includes(word))) return interaction.reply({ content: `As palavras \`${chaves}\` são chaves de acesso restrito!`, ephemeral: true });

        try {
            const evaled = eval(command);
            const embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("Eval Concluído!")
                //.addField(`Tipo:`, `\`\`\`prolong\n${typeof (evaled)}\`\`\``, true)
                .addField("Evaluado em:", `\`\`\`yaml\n${Date.now() - interaction.createdTimestamp}ms\`\`\``, true)
                .addField(`Entrada`, '```js\n' + command + '\n```')
                .addField(`Saída`, '```js\n' + inspect(evaled, { depth: 0 }) + '\n```')

            return interaction.reply({ embeds: [embed] })

        } catch (error) {
            const enbedfallo = new MessageEmbed()
                .setTitle('Eval Incorreto!')
                .setColor('ORANGE')
                .addField(`entrada`, `\`\`\`js\n${command}\`\`\``)
                .addField(`erro`, `\`\`\`js\n${error}\`\`\``)
            return interaction.reply({ embeds: [enbedfallo] })
        }
    }
}