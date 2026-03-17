import http from 'http';

async function req(method, path, body) {
  return new Promise((resolve) => {
    const options = { hostname: 'localhost', port: 3000, path, method, headers: { 'Content-Type': 'application/json' } };
    const r = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const status = res.statusCode;
        const icon = (status >= 200 && status < 300) ? '✅' : (status === 400 || status === 404) ? '🟡' : '❌';
        resolve(`${icon} ${method.padEnd(6)} ${path.padEnd(20)} => ${status}  ${data.slice(0, 40)}`);
      });
    });
    r.on('error', e => resolve(`❌ ${method} ${path} => ERR ${e.message}`));
    if (body) r.write(typeof body === 'string' ? body : JSON.stringify(body));
    r.end();
  });
}

const tests = [
  ['GET',    '/',              null],
  // Users
  ['GET',    '/users',         null],
  ['GET',    '/users/1',       null],
  ['GET',    '/users/999',     null],            // 404
  ['POST',   '/users',         {}],              // 400 (no name)
  ['POST',   '/users',         {name:'Test'}],   // 201
  ['PUT',    '/users/1',       {name:'Updated'}],
  ['PUT',    '/users/999',     {name:'X'}],      // 404
  ['PUT',    '/users/1',       {}],              // 400 (no name)
  ['DELETE', '/users/1',       null],
  ['DELETE', '/users/999',     null],            // 404
  // Articles
  ['GET',    '/articles',      null],
  ['GET',    '/articles/1',    null],
  ['GET',    '/articles/999',  null],            // 404
  ['POST',   '/articles',      {}],              // 400 (no title)
  ['POST',   '/articles',      {title:'Test'}],  // 201
  ['PUT',    '/articles/1',    {title:'Updated'}],
  ['PUT',    '/articles/999',  {title:'X'}],     // 404
  ['PUT',    '/articles/1',    {}],              // 400 (no title)
  ['DELETE', '/articles/1',    null],
  ['DELETE', '/articles/999',  null],            // 404
  // Not found route
  ['GET',    '/nonexistent',   null],            // 404
];

for (const [method, path, body] of tests) {
  const bodyStr = body ? JSON.stringify(body) : null;
  console.log(await req(method, path, bodyStr));
}
