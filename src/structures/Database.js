const mongoose = require('mongoose');
require('colors');

main().catch(err => console.log(`${err}`.red));

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.PROJECT}.hjcbm.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`);
    console.log('Conectado ao Banco de Dados!'.yellow);
}