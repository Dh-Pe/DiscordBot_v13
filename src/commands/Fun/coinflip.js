const Command = require('../../structures/Command.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "coinflip",
            description: "Joga cara ou coroa com o bot.",
            category: 'Diversão',
            options: [
                {
                    name: 'lado',
                    type: 'STRING',
                    description: 'Digite "cara" ou "coroa".',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        let lado = interaction.options.getString("lado");
        var array1 = ["cara", "coroa"];
        var rand = Math.floor(Math.random() * array1.length);

        if(lado.toLowerCase() !== "cara" && lado.toLowerCase() !== "coroa") {
            return interaction.reply({ content: "insira **cara** ou **coroa** na frente do comando.", ephemeral: true });
        } else if (lado.toLowerCase() == array1[rand]) {
            interaction.reply({content: "Deu **" + array1[rand] + "**, você ganhou dessa vez!"});
        } else if (lado[0].toLowerCase() != array1[rand]) {
            interaction.reply({content: "Deu **" + array1[rand] + "**, você perdeu dessa vez!"});
        }
    }
}