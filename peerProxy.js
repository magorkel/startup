const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  let connections = [];
  let admin = null;

  httpServer.on('upgrade', (request, socket, head) => {
    const authToken = request.headers['sec-websocket-protocol'];
    const isAdmin = authToken === 'admin-special-token';

    if (!isAdmin && authToken !== 'user-token') {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, isAdmin);
    });
  });

  wss.on('connection', (ws, request, isAdmin) => {
    const connection = {
      id: uuid.v4(),
      alive: true,
      ws: ws,
      isAdmin: isAdmin,
    };

    if (isAdmin) {
      admin = connection;
    }

    connections.push(connection);

    ws.on('message', function message(data) {
      const { message, targetId } = JSON.parse(data);
      if (connection.isAdmin) {
        const targetConnection = connections.find(c => c.id === targetId);
        if (targetConnection) {
          targetConnection.ws.send(message);
        }
      } else {
        if (admin) {
          admin.ws.send(JSON.stringify({ from: connection.id, message }));
        }
      }
    });

    ws.on('close', () => {
      connections = connections.filter(c => c.id !== connection.id);
      if (connection.isAdmin) {
        admin = null;
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach(c => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
