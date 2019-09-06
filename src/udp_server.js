const PORT = 3000;
const HOST = '0.0.0.0';

const fs = require('fs');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', function() {
  const address = server.address();
  console.log(`UDP SERVER ON -> ${address.address}:${address.port}`);
});

server.on('message', function(message, remote) {
    console.log(`Nova conexão: ${remote.address}:${remote.port} - Msg: ${message}`);

    
    //const name = `${__dirname}/../img/newflag.txt`;
    //const name = `${__dirname}/../img/novo.txt`;
    const name = `${__dirname}/../img/flag.txt`;

    
    let PORT_CLIENT = remote.port;
    let HOST_CLIENT  = remote.address;

    let data = Buffer.from(fs.readFileSync(name, 'utf8'));
    console.log(`${data.byteLength} bytes`);
    
    server.send(data.toString(), 0, data.byteLength, PORT_CLIENT, HOST_CLIENT, function(err, bytes) {
      if (err) throw err;
        console.log(`Mensagem enviada para ${HOST_CLIENT}:${PORT_CLIENT}`);
        console.log(`Bytes enviados: ${data.length}`);
    }); 

});

server.bind(PORT, HOST);
