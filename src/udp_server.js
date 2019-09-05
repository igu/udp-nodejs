const PORT = 33333;
const HOST = 'localhost';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', function() {
  const address = server.address();
  console.log(`UDP SERVER ON -> ${address.address}:${address.port}`);
});

server.on('message', function(message, remote) {
    console.log(`Nova conexão: ${remote.address}:${remote.port} - Msg: ${message}`);
    const final = 'Meu nome é Igorr';
    let PORT_CLIENT = remote.port;
    let HOST_CLIENT  = remote.address;
    server.send(final, 0, final.length, PORT_CLIENT, HOST_CLIENT, function(err, bytes) {
        if (err) throw err;
        console.log(`Mensagem enviada para ${HOST_CLIENT}:${PORT_CLIENT}`);
        console.log(`Tamanho: ${final.length}`);
    });
});

server.bind(PORT, HOST);