const { model, Schema } = require('mongoose');

const Guild = new Schema({
    GuildID: {
        type: String,
        required: true
    },
    GuildPremium: {
        type: Boolean,
        default: false
    },
    LogChannelID: {
        type: String,
        default: false
    },
    SuggestionChannelID: {
        type: String,
        default: false
    },
    WelcomeChannelID: {
        type: String,
        default: false
    },
    LevelChannelID: {
        type: String,
        default: false
    },
    TicketChannelID: {
        type: String,
        default: false
    },
    TicketMessageID: {
        type: String,
        default: false
    }
});

module.exports = model("Guild", Guild);