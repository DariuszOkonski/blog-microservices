const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const events = [];

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  console.group('--- Event-Bus ---');
  console.log('event: ', event);
  console.log('events.length: ', events.length)
  console.log('-----------------')
  console.groupEnd();

  axios
    .post('http://localhost:4000/events', event)
    .catch((err) => console.log(err.message)); // posts
  axios
    .post('http://localhost:4001/events', event)
    .catch((err) => console.log(err.message)); // comments
  axios
    .post('http://localhost:4002/events', event)
    .catch((err) => console.log(err.message)); // query

  axios
    .post('http://localhost:4003/events', event)
    .catch((err) => console.log(err.message)); // moderation

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(4005, () => {
  console.log('Listening on 4005...');
});
