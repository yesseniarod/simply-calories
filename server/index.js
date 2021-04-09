require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/userTable',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/users', (req, res) => {
  const { gender, age, height, currentWeight, goalWeight, activityLevel } = req.body;
  if (!gender || !age || !height || !currentWeight || !activityLevel || !goalWeight) {
    res.status(400).json({ error: 'all fields required' });
    return;
  }
  const sql = `
        insert into "users" ("gender", "age", "height", "currentWeight", "goalWeight", "activityLevel")
        values ($1, $2, $3, $4, $5, $6)
        returning *
  `;
  const params = [gender, age, height, currentWeight, goalWeight, activityLevel];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.send({ error: 'Unexpected error occurred' });
    });
});

app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!Number.isInteger(userId) || userId < 1) {
    res.status(400).json({ error: 'userId must be a positive integer' });
    return;
  }
  const sql = `
      select "gender",
              "age",
              "height",
              "goalWeight",
              "activityLevel"
        from  "users"
        where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'Unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
