import express from 'express';
import connectDB from '#config/database.js';
import userRoutes from '#routes/user.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
