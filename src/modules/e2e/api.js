import http from 'http';

const PORT = 3000;

const ROUTES = {
  '/contact:GET': (_, res) => {
    res.write('contact us page');
    return res.end();
  },
  '/login:POST': async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);

      if (user.username !== 'admin' || user.password !== 'admin') {
        res.writeHead(401);
        res.write('Invalid credentials');
        return res.end();
      }
    }

    res.write('Logging has been successful');
    return res.end();
  },
  default(_, res) {
    res.write('Not Found');
    return res.end();
  },
};

function handler(req, res) {
  const { url, method } = req;

  const routeKey = `${url}:${method}`;

  const chosen = ROUTES[routeKey] || ROUTES.default;

  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  chosen(req, res);
}

export function buildServer() {
  return http.createServer(handler).listen(PORT, () => {
    console.log('Server started at http://localhost:3000');
  });
}
