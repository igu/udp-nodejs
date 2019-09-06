const PORT = 3000;
const HOST = '52.168.151.83';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const msg = 'ok';

var dateInicial;
var dateFinal;


client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  dateInicial = Date.now();
  console.log(`Conexão iniciada com ${HOST}:${PORT}...`);
});

client.on('message', function(message, remote) {
    console.log(`Mensagem recebida de ${remote.address}:${remote.port}`);
    console.log(`Msg: ${message}`);
    console.log(`Bytes recebidos: ${message.length} bytes`);
    dateFinal = Date.now();
    console.log(`Milisegundos Inicial ${dateInicial}`);
    console.log(`Milisegundos Final ${dateFinal}`);
    console.log(`Tempo final: ${dateFinal - dateInicial}ms`);
    client.close();
});