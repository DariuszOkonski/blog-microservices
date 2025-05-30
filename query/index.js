const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
}
// quick example
/**
 * posts = {
 *  'j1232': {
 *    id: 'j1232',
 *    title: 'post 1'
 *    comments: [
 *      { id: 'ksjfdl', content: 'comment' },
 *      { id: 'sfdsdd', content: 'other comment' }
 *    ]
 *  }
 * }
 *
 *
 */

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('Received Event in query: ', req.body.type);
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002...');

  try {
    const res = await axios.get('http://localhost:4005/events');
    
    for(let event of res.data) {
      console.log('Processing event: ', event.type)

      handleEvent(event.type, event.data);
    }

  } catch (err) {
    console.log(err.message)
  }
});
