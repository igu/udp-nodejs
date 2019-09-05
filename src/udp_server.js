const PORT = 3000;
const HOST = '40.114.65.11';

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
    const name = `${__dirname}/../img/novo.txt`;
    //const name = `${__dirname}/../img/flag.txt`;

    let dateInicial = Date.now();
    let PORT_CLIENT = remote.port;
    let HOST_CLIENT  = remote.address;

    let data = Buffer.from(fs.readFileSync(name, 'utf8'));
    console.log(`${data.byteLength}bytes`);
    
    server.send(data.toString(), 0, data.byteLength, PORT_CLIENT, HOST_CLIENT, function(err, bytes) {
      if (err) throw err;
        console.log(`Mensagem enviada para ${HOST_CLIENT}:${PORT_CLIENT}`);
        console.log(`Bytes enviados: ${data.length}`);
        console.log(`Milisegundos Inicial ${dateInicial}`);
        let dateFinal = Date.now();
        console.log(`Milisegundos Final ${dateFinal}`);
        console.log(`Tempo final: ${dateFinal - dateInicial}ms`);
    }); 

});

server.bind(PORT, HOST);