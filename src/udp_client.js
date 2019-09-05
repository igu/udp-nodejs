const PORT = 3000;
const HOST = 'localhost';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const msg = 'ok';

client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log(`Conexão iniciada com ${HOST}:${PORT}...`);
});

client.on('message', function(message, remote) {
    console.log(`Mensagem recebida de ${remote.address}:${remote.port}`);
    console.log(`Msg: ${message}`);
    console.log(`Bytes recebidos: ${message.length}`);
    client.close();
});