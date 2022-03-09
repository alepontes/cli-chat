const net = require('net');

class Client {

    _client;

    constructor(PORT, host) {
        this._client = net.connect(PORT, host);
    }

    connect(callback) {
        this._client.on('connect', callback);
    }

    data(callback) {
        this._client.on('data', (data) => callback(data));
    }

    end(callback) {
        this._client.on('end', callback);
    }

    error(callback) {
        this._client.on('error', callback);
    }

    write(data) {
        this._client.write(`client: ${data}`);
    }


}

class Server {

    _server;
    _connection;

    constructor(PORT) {
        this._server = net.createServer();
        this._server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
    }

    connect(callback) {
        this._server.on('connection', (connection) => {
            this._connection = connection;
            callback(this._connection);
        });
    }

    data(callback) {
        this._connection.on('data', (data) => callback(data));
    }

    end(callback) {
        this._connection.on('end', (data) => callback(data));
    }

    error(callback) {
        this._server.on('error', (err) => callback(err));
    }

    write(data) {
        this._connection.write(`host: ${data}`);
    }

}

module.exports = {
    Client,
    Server,
}