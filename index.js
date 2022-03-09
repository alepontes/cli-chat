const PORT = 3001;
const ReadLine = require('./readLine');
const { Client, Server } = require('./io');
const [, , host] = process.argv;

const io = host ? new Client(PORT, host) : new Server(PORT);
const readline = new ReadLine();

readline.onLine(line => io.write(line));

io.connect((c) => {
    console.log(`Conectado ao ${host ? `HOST` : `CLIENT`}`);

    io.data(data => readline.log(data));
    io.end(() => console.log(`Flw Flw Até`));
    io.error((err) => { throw err });
});