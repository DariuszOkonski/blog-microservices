const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// quick example
/**
 * posts = {
 *  'j1232': {
 *    id: 'j1232',
 *    title: 'post 1'
 *
 *  }
 * }
 *
 *
 */

app.get('/posts', (req, res) => {});

// app.post('/events', (req, res) => {
//   res.send('Ok from query-service');
// });

app.listen(4002, () => {
  console.log('Listening on 4002...');
});
