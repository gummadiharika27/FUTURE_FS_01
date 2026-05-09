const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const FILE_PATH = path.join(__dirname, 'messages.json');

if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '[]');
}

app.get('/messages', (req, res) => {
  const data = fs.readFileSync(FILE_PATH);
  res.json(JSON.parse(data));
});
app.post('/messages', (req, res) => {
  const messages = JSON.parse(fs.readFileSync(FILE_PATH));

  const newMessage = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  messages.push(newMessage);

  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.delete('/messages/:id', (req, res) => {
  let messages = JSON.parse(fs.readFileSync(FILE_PATH));
 messages = messages.filter(msg => msg.id != req.params.id);

  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.put('/messages/:id', (req, res) => {
  let messages = JSON.parse(fs.readFileSync(FILE_PATH));

  messages = messages.map(msg => {
    if (msg.id == req.params.id) {
      return {
        ...msg,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
      };
    }

    return msg;
  });

  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});