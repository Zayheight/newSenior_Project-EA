const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Push

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")
  var a=[1,2,3]
  while (true) {
    await sock.send(a[0])
    await sock.send(a[1])
    await sock.send(a[2])
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

run()