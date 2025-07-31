import express from 'express';
import usersRoutes from '#routes/users.js';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
