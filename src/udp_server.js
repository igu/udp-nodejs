const PORT = 33333;
const HOST = '10.25.2.124';

const fs = require('fs');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', function() {
  const address = server.address();
  console.log(`UDP SERVER ON -> ${address.address}:${address.port}`);
});

server.on('message', function(message, remote) {
    console.log(`Nova conexão: ${remote.address}:${remote.port} - Msg: ${message}`);
    //let dateInicial = new Date();
    //console.log('TESTE 1: ' + dateInicial.getMilliseconds());
    var dateInicial = Date.now();
    var dateFinal;
    var timeSpan;
    console.log(dateInicial);
    var final = '';
    fs.readFile( __dirname + '/../img/putty-64bit-0.72-installer.msi', function (err, data) {
      if (err) {
        throw err; 
      }
   
     let PORT_CLIENT = remote.port;
     let HOST_CLIENT  = remote.address;
        server.send(data.toString(), 0, data.length, PORT_CLIENT, HOST_CLIENT, function(err, bytes) {
            if (err) throw err;
            console.log(`Mensagem enviada para ${HOST_CLIENT}:${PORT_CLIENT}`);
            console.log(`Tamanho: ${data.length}`);
        }); 
    });

     dateFinal = Date.now();
      timeSpan = dateFinal-dateInicial;
      console.log(dateFinal);
      console.log(timeSpan);


});

server.bind(PORT, HOST);