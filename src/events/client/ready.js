require('colors')
const Event = require('../../structures/Event.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }

    run = async () => {
        this.client.guilds.cache.forEach(a => console.log(`${this.client.user.username} logado com sucesso no servidor: ${a.name}`.green));
        this.client.registryCommands();
    }
}