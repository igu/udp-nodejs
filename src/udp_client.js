const PORT = 3333;
const HOST = 'https://udp-nodejs.herokuapp.com/';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const msg = 'ok';

client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log(`Conexão iniciada com ${HOST}:${PORT}...`);
});

client.on('message', function(message, remote) {
    console.log(`Mensagem recebida de ${remote.address}:${remote.port} - Msg: ${message} / Msg length: ${message.length}`);
    client.close();
});