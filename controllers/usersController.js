import { users } from '../data/store.js';

export const getUsers = (req, res) => {
  res.status(200).send('Get users route');
};

export const createUser = (req, res) => {
  const { name } = req.body;

  if(!name) {
    return res.status(400).send('Bad Request');
  }

  res.status(201).send('Post users route');
};

export const getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.userId);

  if (!user) {
    return res.status(404).send('Not Found')
  }

  res.status(200).send(`Get user by Id route: ${req.params.userId}`);
};

export const updateUser = (req, res) => {
  const user = users.find(u => u.id === req.params.userId);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  if (!req.body.name) {
    return res.status(400).send('Bad Request');
  }

  res.status(200).send(`Put user by Id route: ${req.params.userId}`);
};

export const deleteUser = (req, res) => {
  const user = users.find(u => u.id === req.params.userId);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};
