require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
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

app.post('/api/food-journal', (req, res) => {
  const { userId, name, calories, serving, image, unit } = req.body;
  if (userId === null || name === null || calories === null || serving === null || image === null || unit === null) {
    res.status(400).json({
      error: 'name, calories, serving, image, and unit are required'
    });
    return;
  }
  const sql = `
       insert into "food-journal" ("userId", "name", "calories", "serving", "image", "unit")
       values ($1, $2, $3, $4, $5, $6)
       returning *
     `;
  const params = [userId, name, calories, serving, image, unit];
  db.query(sql, params)
    .then(result => {
      const [item] = result.rows;
      res.status(201).json(item);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/food-journal/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!Number.isInteger(userId) || userId < 1) {
    res.status(400).json({ error: 'userId must be a positive integer' });
    return;
  }
  const sql = `
    select "foodId",
            "name",
            "calories",
            "serving",
            "image",
            "unit"
    from "food-journal"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/workout-journal', (req, res) => {
  const { userId, name, duration, calories } = req.body;
  if (userId === null || name === null || duration === null || calories === null) {
    res.status(400).json({
      error: 'name, duration, and calories are required'
    });
    return;
  }
  const sql = `
      insert into "workout-journal" ("userId","name", "duration", "calories")
      values ($1, $2, $3, $4)
      returning *
  `;
  const params = [userId, name, duration, calories];
  db.query(sql, params)
    .then(result => {
      const [item] = result.rows;
      res.status(201).json(item);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/workout-journal/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!Number.isInteger(userId) || userId < 1) {
    res.status(400).json({ error: 'userId must be a positive integer' });
    return;
  }
  const sql = `
    select "name",
          "duration",
          "calories",
          "workoutId"
    from "workout-journal"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/credentials/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    res.send('username and password are required fields');
    return;
  }
  argon2.hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "credentials"("username", "hashedPassword")
      values($1, $2)
      returning "userId", "username", "createdAt"
    `;
      const values = [username, hashedPassword];
      return db.query(sql, values);
    })
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      if (err.code === '23505') {
        res.send(err.code);
      } else {
        next(err);
      }
    });
});

app.post('/api/credentials/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401);
    res.send('invalid login');
    return;
  }
  const sql = `
        select "userId",
               "hashedPassword"
          from "credentials"
          where "username" = $1
  `;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        res.status(401);
        res.send('invalid login');
        return;
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            res.status(401);
            res.send('invalid login');
            return;
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
