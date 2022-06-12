const { Schema, model } = require('mongoose');

const Member = new Schema({
    GuildID: {
        type: String,
        required: true
    },
    MemberID: {
        type: String,
        required: true
    },
    MemberXP: {
        type: Number,
        default: 0
    },
    MemberLVL: {
        type: Number,
        default: 1
    },
    MemberJOB: {
        type: Number,
        default: 0
    },
    MemberCOIN: {
        type: Number,
        default: 0
    },
    MemberPremium: {
        type: Boolean,
        default: false
    },
    MemberDOWN: {
        type: Date,
        default: Date.now() - Date.now()
    },
    MemberDailyDOWN: {
        type: Date,
        default: Date.now() - Date.now()
    },
    MemberDailyCount: {
        type: Number,
        default: 0
    },
    MemberAM: {
        type: String,
        default: 'Não possui.'
    }
});

module.exports = model("Member", Member)