import express from 'express';
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Juan" },
  { id: 2, name: "María" },
];

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users', (req, res) => {
  const updatedUser = req.body;
  const index = users.findIndex(user => user.id === updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser;
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!\n');
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});