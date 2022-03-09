const readline = require('readline');

module.exports = class ReadLine {

    readlineInterface;

    constructor() {
        this.readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> ',
        });
    }

    onLine(callback) {
        this.readlineInterface.on('line', line => {
            callback(line.trim());
            this.prompt();
        });
    }

    prompt() {
        this.readlineInterface.prompt();
    }

    onClose() {
        this.readlineInterface.on('close', () => {
            console.log('Fechando cliente');
            process.exit(0);
        });
    }

    log(data) {
        console.log(`${data.toString()}`);
        this.prompt();
    }

}