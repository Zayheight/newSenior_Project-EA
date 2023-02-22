const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Pull

  sock.connect("tcp://127.0.0.1:3000")
  var a=0;
  for await (const [msg] of sock) {
    console.log(sock.length);
  }
}

run()