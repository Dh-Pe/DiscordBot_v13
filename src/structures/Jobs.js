function Job(all, id = 0) {
    if (isNaN(id)) throw new TypeError(`'id' is not a number`);
    if (id > 10 || id < 0) throw new Error(`'id' is limited to the number 10`);

    const jobs = [
        { job: 'Desempregado(a)', bal: 100, required: 1 },
        { job: 'Atendente', bal: 1198, required: 5 },
        { job: 'Motorista', bal: 2386, required: 20 },
        { job: 'Professor(a)', bal: 6571, required: 45 },
        { job: 'Fotógrafo(a)', bal: 7523, required: 70 },
        { job: 'Policial', bal: 8250, required: 90 },
        { job: 'Arquiteto(a)', bal: 9001, required: 140 },
        { job: 'Designer', bal: 11316, required: 185 },
        { job: 'Advogado(a)', bal: 12875, required: 210 },
        { job: 'Médico(a)', bal: 15750, required: 230 },
        { job: 'Desenvolvedor(a)', bal: 20000, required: 300 }
    ];

    if(all === true) return jobs;
    else return jobs[id];
}

module.exports = {
    Job
}