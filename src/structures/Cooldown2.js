async function Cooldown(timeout = 86400000, guildId, userId) {
    const Member = require('../schemas/Member.js');
    let db = await Member.findOne({ GuildID: guildId, MemberID: userId });

    if(timeout - (Date.now() - db.MemberDailyDOWN) > 0) {
        return false;
    } else {
        db.MemberDailyDOWN = Date.now();

        db.MemberCOIN = db.MemberCOIN + 1000;

        db.save();

        return true;
    }
}

module.exports = {
    Cooldown
}