async function Cooldown(timeout = 86400000, guildId, userId) {
    const Member = require('../schemas/Member.js');
    const { Job } = require('./Jobs.js');
    let db = await Member.findOne({ GuildID: guildId, MemberID: userId });

    if(timeout - (Date.now() - db.MemberDOWN) > 0) {
        return false;
    } else {
        db.MemberDOWN = Date.now();

        let trabalho = Job(false, db.MemberJOB)

        db.MemberCOIN = db.MemberCOIN + trabalho.bal;

        db.save();

        return true;
    }
}

module.exports = {
    Cooldown
}