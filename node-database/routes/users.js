import { Router } from 'express';
import connection from '#config/database.js';

const router = Router();

// NOTE: Route to list all users (READ)
router.get('/', (_, res) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error fetching users');
      console.error(error);
      return;
    }

    res.status(200).json(results);
  });
});

// NOTE: Route to add a new user (CREATE)
router.post('/', (req, res) => {
  const { name, age } = req.body;

  const query = 'INSERT INTO users (name, age) VALUES (?, ?)';

  connection.query(query, [name, age], (error) => {
    if (error) {
      res.status(500).send('Error inserting user');
      console.log(error);
      return;
    }

    res.status(201).send('User successfully inserted');
  });
});

// NOTE: Route to update a user (UPDATE)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const query = 'UPDATE users SET name = ?, age = ? WHERE id = ?';

  connection.query(query, [name, age, id], (error, results) => {
    if (error) {
      res.status(500).send('Error updating user');
      console.error(error);
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('User not found');
    }

    res.status(200).send('User updated successfully');
  });
});

// NOTE: Route to delete a user (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).send('Error deleting user');
      console.error(error);
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  });
});

export default router;
