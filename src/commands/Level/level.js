const Command = require('../../structures/Command.js');
const Member = require('../../schemas/Member.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Rank } = require('canvacord');
const { MD5 } = require('hash-converter');


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Exibe o Level e o XP.",
            category: 'Level',
            options: [
                {
                    name: 'membro',
                    required: false,
                    description: 'Membro no qual deseja utilizar esta interação.',
                    type: 'USER'
                }
            ]
        })
    }

    run = async (interaction) => {
        let user = interaction.options.getUser('membro');
        if (!user) user = interaction.user;

        let db = await Member.findOne({ GuildID: MD5(interaction.guild.id), MemberID: MD5(user.id) })

        const img = user.displayAvatarURL({ dynamic: true, format: 'png' })
        const rank = new Rank().setAvatar(img).setCurrentXP(db.MemberXP, "ORANGE").setRequiredXP(db.MemberLVL * 1000, "ORANGE").setProgressBar("ORANGE", "COLOR").setUsername(user.username).setDiscriminator(user.discriminator).setLevelColor('ORANGE', 'ORANGE').setLevel(db.MemberLVL, 'Level').setRank(Number('a'), "Level").setRankColor("", "ORANGE")
        
        rank.build().then(async data => {
            const attachment = await new MessageAttachment(data, "RankCard.png");
            interaction.reply({ files: [attachment] })
        })

    }
}