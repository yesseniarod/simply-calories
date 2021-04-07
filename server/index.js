require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
// const pg = require('pg');

// const db = new pg.Pool({
//   connectionString: 'postgres://dev:dev@localhost/userTable',
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const app = express();

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
